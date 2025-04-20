import { z } from 'zod'

import { participantSchemaRoute } from '@/app/api/participants/participant.schema'
import { prisma } from '@/constants'
import { FormParticipant } from '@/services/queries/participants/participants.type'

export const updateParticipantById = async (
	data: FormParticipant,
	id: string,
) => {
	try {
		participantSchemaRoute
			.extend({
				id: z.string().uuid(),
			})
			.parse({ ...data, id })

		const { street, city, neighborhood, number, state, ...participantData } =
			data

		return await prisma.$transaction(async (tx) => {
			await tx.participant.update({
				where: {
					id,
				},
				data: {
					...participantData,
				},
			})
			await tx.address.update({
				where: {
					participantId: id,
				},
				data: {
					street,
					city,
					neighborhood,
					number,
					state,
				},
			})
		})
	} catch (error) {
		console.error('@updateParticipantById error:', error)
		throw Error
	}
}
