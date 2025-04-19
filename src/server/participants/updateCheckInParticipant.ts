import { z } from 'zod'

import { CHECK_IN_STATUS, prisma } from '@/constants'

export type UpdateCheckInParticipantArgs = {
	participantId: string
	eventId: string
	status: (typeof CHECK_IN_STATUS)['CONFIRMED' | 'WITHDREW']
}

export const updateCheckInParticipant = async ({
	eventId,
	participantId,
	status,
}: UpdateCheckInParticipantArgs) => {
	try {
		z.object({
			eventId: z.string().uuid(),
			participantId: z.string().uuid(),
			status: z.enum([CHECK_IN_STATUS.CONFIRMED, CHECK_IN_STATUS.WITHDREW]),
		}).parse({ eventId, participantId, status })

		return await prisma.participant.update({
			where: {
				id: participantId,
				eventId,
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
