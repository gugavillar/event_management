import imgbbUpload from 'imgbb-image-uploader'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const ACCEPTED_TYPE = ['image/jpeg', 'image/png', 'image/jpg']

const savePictureSchema = z.object({
	eventId: z.uuid(),
	eventName: z.string(),
	file: z
		.any()
		.refine((file) => file !== null, {
			message: 'Arquivo é obrigatório',
		})
		.refine((file) => file instanceof File, {
			message: 'Arquivo inválido',
		})
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: 'O arquivo deve ter no máximo 1MB',
		})
		.refine((file) => ACCEPTED_TYPE.includes(file?.type), {
			message: 'O arquivo deve ser uma imagem',
		}),
	participantId: z.uuid(),
	participantName: z.string(),
})

export const saveParticipantPicture = async (data: FormData) => {
	const rawData = Object.fromEntries(data.entries())
	const file = data.get('picture')
	try {
		const parsed = savePictureSchema.parse({ ...rawData, file })

		const { file: image, ...prismaValues } = parsed
		const pictureName = `${prismaValues.participantName} ${prismaValues.eventName}`

		const {
			data: { url },
		} = await imgbbUpload({
			expiration: 0,
			image,
			key: process.env.IMG_BB_API_KEY as string,
			name: pictureName,
		})

		if (!url) {
			throw Error
		}

		return await prisma.participant.update({
			data: {
				pictureUrl: url,
			},
			where: {
				id: prismaValues.participantId,
			},
		})
	} catch (error) {
		console.error('@saveParticipantPicture error:', error)
		throw Error
	}
}
