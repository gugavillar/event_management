import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
	volunteerSchemaRoute,
	VolunteerSchemaRouteType,
} from '@/app/api/volunteers/volunteer.schema'
import { prisma } from '@/constants'

export const createVolunteer = async (
	data: VolunteerSchemaRouteType & { eventId: string },
	inscriptionType: string | null,
) => {
	try {
		volunteerSchemaRoute
			.extend({
				eventId: z.string().uuid(),
			})
			.parse({ ...data })

		const { address, ...restData } = data

		const isAlreadyRegistered = await prisma.volunteer.findFirst({
			where: {
				email: data.email,
				eventId: data.eventId,
			},
		})

		if (isAlreadyRegistered) {
			return NextResponse.json(
				{ error: 'Voluntário ja cadastrado' },
				{ status: 400 },
			)
		}

		const isRegistrationOpen = await prisma.event.findUnique({
			where: {
				id: data.eventId,
			},
		})

		if (!isRegistrationOpen?.isVolunteerRegistrationOpen && !inscriptionType) {
			return NextResponse.json(
				{ error: 'Inscrições encerradas' },
				{ status: 400 },
			)
		}

		return await prisma.$transaction(async (tx) => {
			const volunteer = await tx.volunteer.create({
				data: restData,
			})

			await tx.volunteerAddress.create({
				data: {
					...address,
					volunteerId: volunteer.id,
				},
			})

			await tx.volunteerPayment.create({
				data: {
					volunteerId: volunteer.id,
					eventId: data.eventId,
					paymentValue: 0,
				},
			})
		})
	} catch (error) {
		console.error('@createVolunteer error:', error)
		throw Error
	}
}
