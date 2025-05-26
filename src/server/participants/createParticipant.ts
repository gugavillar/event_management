import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
	ParticipantSchemaRouteType,
	participantSchemaRoute,
} from '@/app/api/participants/participant.schema'
import { prisma } from '@/constants'

export const createParticipant = async (
	data: ParticipantSchemaRouteType & { eventId: string },
) => {
	try {
		participantSchemaRoute
			.extend({
				eventId: z.string().uuid(),
			})
			.parse({ ...data })

		const { address, ...restData } = data

		const isAlreadyRegistered = await prisma.participant.findFirst({
			where: {
				email: data.email,
				eventId: data.eventId,
			},
		})

		if (isAlreadyRegistered) {
			return NextResponse.json(
				{ error: 'Participante ja cadastrado' },
				{ status: 400 },
			)
		}

		return await prisma.$transaction(async (tx) => {
			const participant = await tx.participant.create({
				data: restData,
			})

			await tx.participantAddress.create({
				data: {
					...address,
					participantId: participant.id,
				},
			})

			await tx.participantPayment.create({
				data: {
					participantId: participant.id,
					eventId: data.eventId,
					paymentValue: 0,
				},
			})
		})
	} catch (error) {
		console.error('@createParticipant error:', error)
		throw Error
	}
}
