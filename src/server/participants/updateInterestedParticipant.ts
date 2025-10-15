import { z } from 'zod'

import { prisma } from '@/constants'

export type UpdateInterestedParticipantArgs = {
	participantId: string
	interested: boolean
}

export const updateInterestedParticipant = async (
	participantId: string,
	interested: boolean
) => {
	try {
		z.object({
			interested: z.boolean(),
			participantId: z.uuid(),
		}).parse({ interested, participantId })

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
