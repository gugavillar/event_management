import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { s3 } from '@/lib/s3'

const MAX_FILE_SIZE = 400 * 1024 // 400KB
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
	fileType: z.string(),
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

		const sanitizedName = prismaValues.participantName
			.toLowerCase()
			.replace(/\s+/g, '-')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')

		const key = `${prismaValues.eventId}/${prismaValues.participantId}-${sanitizedName}`

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET!,
			ContentType: prismaValues.fileType,
			Key: key,
		})

		const url = await getSignedUrl(s3, command, {
			expiresIn: 60,
		})

		await fetch(url, {
			body: file,
			headers: {
				'Content-Type': prismaValues.fileType,
			},
			method: 'PUT',
		})

		return await prisma.participant.update({
			data: {
				pictureUrl: key,
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
