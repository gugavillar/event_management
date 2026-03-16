import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const getParticipantById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.participant.findUnique({
			include: {
				address: true,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getParticipantById error:', error)
		throw Error
	}
}
