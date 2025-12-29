import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const removeParticipantById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.participant.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeParticipantById error:', error)
		throw Error
	}
}
