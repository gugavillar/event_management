import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { s3 } from '@/lib/s3'

export const getParticipantById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		const data = await prisma.participant.findUnique({
			include: {
				address: true,
			},
			where: {
				id,
			},
		})

		if (!data?.pictureUrl) {
			return data
		}

		const command = new GetObjectCommand({
			Bucket: process.env.AWS_BUCKET!,
			Key: data?.pictureUrl!,
		})

		const url = await getSignedUrl(s3, command, {
			expiresIn: 300,
		})

		return {
			...data,
			...(data?.pictureUrl && {
				pictureUrl: url,
			}),
		}
	} catch (error) {
		console.error('@getParticipantById error:', error)
		throw Error
	}
}
