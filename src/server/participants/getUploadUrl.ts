import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse } from 'next/server'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { s3 } from '@/lib/s3'

export const getUploadUrl = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		const data = await prisma.participant.findUnique({
			where: {
				id,
			},
		})

		if (!data?.pictureUrl) {
			return NextResponse.json({ error: 'Nenhuma imagem encontrada' }, { status: 400 })
		}

		const command = new GetObjectCommand({
			Bucket: process.env.AWS_BUCKET!,
			Key: data?.pictureUrl!,
		})

		const url = await getSignedUrl(s3, command, {
			expiresIn: 60,
		})

		return { url }
	} catch (error) {
		console.error('@getUploadUrl error:', error)
		throw Error
	}
}
