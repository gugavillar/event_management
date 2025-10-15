import { z } from 'zod'

import { volunteerSchemaRoute } from '@/app/api/volunteers/volunteer.schema'
import { deepTrim, prisma } from '@/constants'
import type { FormVolunteer } from '@/services/queries/volunteers/volunteers.type'

export const updateVolunteerById = async (data: FormVolunteer, id: string) => {
	try {
		volunteerSchemaRoute
			.extend({
				id: z.uuid(),
			})
			.parse({ ...data, id })

		const trimData = deepTrim(data)

		const { address, ...volunteerData } = trimData

		return await prisma.$transaction(async (tx) => {
			await tx.volunteer.update({
				data: {
					...volunteerData,
				},
				where: {
					id,
				},
			})
			await tx.volunteerAddress.update({
				data: {
					...address,
				},
				where: {
					volunteerId: id,
				},
			})
		})
	} catch (error) {
		console.error('@updateVolunteerById error:', error)
		throw Error
	}
}
