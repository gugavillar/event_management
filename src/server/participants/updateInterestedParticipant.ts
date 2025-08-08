import { z } from 'zod'

import { prisma } from '@/constants'

export type UpdateInterestedParticipantArgs = {
	participantId: string
	interested: boolean
}

export const updateInterestedParticipant = async (
	participantId: string,
	interested: boolean,
) => {
	try {
		z.object({
			participantId: z.uuid(),
			interested: z.boolean(),
		}).parse({ participantId, interested })

		return await prisma.participant.update({
			data: {
				interested,
			},
			where: {
				id: participantId,
			},
		})
	} catch (error) {
		console.error('@updateInterestedParticipant error:', error)
		throw Error
	}
}
