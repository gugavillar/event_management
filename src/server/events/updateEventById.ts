import { differenceInSeconds } from 'date-fns'
import { imgbbUpload } from 'imgbb-image-uploader'
import { z } from 'zod'

import { eventSchemaRoute } from '@/app/api/events/event.schema'
import { fileInputSchema } from '@/components/Atoms'
import { prisma } from '@/lib/prisma'

export const updateEventById = async (data: FormData, id: string) => {
	const rawData = Object.fromEntries(data.entries())
	const file = data.get('file')

	try {
		const parsed = eventSchemaRoute
			.extend({
				file: fileInputSchema,
				id: z.uuid(),
			})
			.parse({ ...rawData, file, id })

		const { file: image, ...prismaValues } = parsed
		const expiration = differenceInSeconds(new Date(), new Date(prismaValues.finalDate))

		const {
			data: { url },
		} = await imgbbUpload({
			expiration,
			image,
			key: process.env.IMG_BB_API_KEY as string,
			name: prismaValues.name,
		})

		if (!url) {
			throw Error
		}

		const newValues = {
			...prismaValues,
			imageUrl: url,
		}

		return await prisma.event.update({
			data: newValues,
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateEventById error:', error)
		throw Error
	}
}
