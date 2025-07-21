import { z } from 'zod'

import { prisma } from '@/constants'

export const getParticipantById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.participant.findUnique({
			where: {
				id,
			},
			include: {
				address: true,
			},
		})
	} catch (error) {
		console.error('@getParticipantById error:', error)
		throw Error
	}
}
