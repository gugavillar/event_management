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

		if (status === CHECK_IN_STATUS.CONFIRMED) {
			return await prisma.participant.update({
				where: {
					id: participantId,
				},
				data: {
					checkIn: CHECK_IN_STATUS.CONFIRMED,
				},
			})
		}

		return await prisma.$transaction(async (tx) => {
			const isParticipantInRoom = await tx.roomMember.findFirst({
				where: {
					participantId,
				},
			})

			if (isParticipantInRoom) {
				await tx.roomMember.deleteMany({
					where: {
						participantId,
					},
				})
			}

			const isParticipantInGroup = await tx.groupMember.findFirst({
				where: {
					participantId,
				},
			})

			if (isParticipantInGroup) {
				await tx.groupMember.deleteMany({
					where: {
						participantId,
					},
				})
			}

			return await tx.participant.update({
				where: {
					id: participantId,
				},
				data: {
					checkIn: CHECK_IN_STATUS.WITHDREW,
				},
			})
		})
	} catch (error) {
		console.error('@updateCheckInParticipant error:', error)
		throw Error
	}
}
