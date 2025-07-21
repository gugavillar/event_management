import { z } from 'zod'

import { volunteerSchemaRoute } from '@/app/api/volunteers/volunteer.schema'
import { prisma } from '@/constants'
import { FormVolunteer } from '@/services/queries/volunteers/volunteers.type'

export const updateVolunteerById = async (data: FormVolunteer, id: string) => {
	try {
		volunteerSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		const { address, ...volunteerData } = data

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
					...address,
				},
			})
		})
	} catch (error) {
		console.error('@updateVolunteerById error:', error)
		throw Error
	}
}
