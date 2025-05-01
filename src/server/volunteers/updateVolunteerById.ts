import { z } from 'zod'

import { volunteerSchemaRoute } from '@/app/api/volunteers/volunteer.schema'
import { prisma } from '@/constants'
import { FormVolunteer } from '@/services/queries/volunteers/volunteers.type'

export const updateVolunteerById = async (data: FormVolunteer, id: string) => {
	try {
		volunteerSchemaRoute
			.extend({
				id: z.string().uuid(),
			})
			.parse({ ...data, id })

		const { street, city, neighborhood, number, state, ...volunteerData } = data

		return await prisma.$transaction(async (tx) => {
			await tx.volunteer.update({
				where: {
					id,
				},
				data: {
					...volunteerData,
				},
			})
			await tx.volunteerAddress.update({
				where: {
					volunteerId: id,
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
		console.error('@updateVolunteerById error:', error)
		throw Error
	}
}
