import { differenceInSeconds } from 'date-fns'
import { imgbbUpload } from 'imgbb-image-uploader'
import { z } from 'zod'

import { eventSchemaRoute } from '@/app/api/events/event.schema'
import { fileInputSchema } from '@/components/Atoms'
import { prisma } from '@/lib/prisma'

export const createEvent = async (data: FormData, userId: string) => {
	const rawData = Object.fromEntries(data.entries())
	const file = data.get('file')

	try {
		const parsed = eventSchemaRoute
			.extend({
				file: fileInputSchema,
				userId: z.uuid(),
			})
			.parse({ ...rawData, file, userId })

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

		return await prisma.event.create({
			data: { ...prismaValues, imageUrl: url, userId },
		})
	} catch (error) {
		console.error('@createEvent error:', error)
		throw Error
	}
}
