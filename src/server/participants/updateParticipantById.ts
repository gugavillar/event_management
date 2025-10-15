import { z } from 'zod'

import { participantSchemaRoute } from '@/app/api/participants/participant.schema'
import { deepTrim, prisma } from '@/constants'
import type { FormParticipant } from '@/services/queries/participants/participants.type'

export const updateParticipantById = async (data: FormParticipant, id: string) => {
	try {
		participantSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		const trimData = deepTrim(data)

		const { address, ...participantData } = trimData

		return await prisma.$transaction(async (tx) => {
			await tx.participant.update({
				data: {
					...participantData,
				},
				where: {
					id,
				},
			})
			await tx.participantAddress.update({
				data: {
					...address,
				},
				where: {
					participantId: id,
				},
			})
		})
	} catch (error) {
		console.error('@updateParticipantById error:', error)
		throw Error
	}
}
