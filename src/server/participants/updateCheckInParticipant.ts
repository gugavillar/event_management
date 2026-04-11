import { z } from 'zod'

import { CHECK_IN_STATUS } from '@/constants'
import { prisma } from '@/lib/prisma'
import { apiMessage } from '@/services/api'

export type UpdateCheckInParticipantArgs = {
	participantId: string
	status: CHECK_IN_STATUS
}

export const updateCheckInParticipant = async ({ participantId, status }: UpdateCheckInParticipantArgs) => {
	try {
		z.object({
			participantId: z.uuid(),
			status: z.enum([CHECK_IN_STATUS.CONFIRMED, CHECK_IN_STATUS.WITHDREW]),
		}).parse({ participantId, status })

		if (status === CHECK_IN_STATUS.CONFIRMED) {
			return await prisma.participant.update({
				data: {
					checkIn: CHECK_IN_STATUS.CONFIRMED,
				},
				where: {
					id: participantId,
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

			const participant = await tx.participant.findUnique({
				include: {
					address: true,
					event: true,
				},
				where: {
					id: participantId,
				},
			})

			const phones = process.env.PHONES_SEND?.split(',').map((phone) => phone.trim()) ?? []

			if (phones?.length) {
				for (const phone of phones) {
					await apiMessage.post('/send-text', {
						message: `Desistência do participante\n\nParticipante: ${participant?.name}\nEvento: ${participant?.event?.name}\nCidade: ${participant?.address?.city}\n\nConvidado por: ${participant?.host}`,
						phone,
					})
				}
			}

			return await tx.participant.update({
				data: {
					checkIn: CHECK_IN_STATUS.WITHDREW,
				},
				where: {
					id: participantId,
				},
			})
		})
	} catch (error) {
		console.error('@updateCheckInParticipant error:', error)
		throw Error
	}
}
