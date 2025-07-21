import { z } from 'zod'

import { prisma } from '@/constants'

export type UpdateInterestedParticipantArgs = {
	participantId: string
}

export const updateInterestedParticipant = async (participantId: string) => {
	try {
		z.object({
			participantId: z.uuid(),
		}).parse({ participantId })

		return await prisma.participant.update({
			data: {
				interested: false,
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
