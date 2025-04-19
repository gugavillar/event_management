import { z } from 'zod'

import { CHECK_IN_STATUS, prisma } from '@/constants'

export type UpdateCheckInParticipantArgs = {
	participantId: string
	status: (typeof CHECK_IN_STATUS)['CONFIRMED' | 'WITHDREW']
}

export const updateCheckInParticipant = async ({
	participantId,
	status,
}: UpdateCheckInParticipantArgs) => {
	try {
		z.object({
			participantId: z.string().uuid(),
			status: z.enum([CHECK_IN_STATUS.CONFIRMED, CHECK_IN_STATUS.WITHDREW]),
		}).parse({ participantId, status })

		return await prisma.participant.update({
			where: {
				id: participantId,
			},
			data: {
				checkIn: status,
			},
		})
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
