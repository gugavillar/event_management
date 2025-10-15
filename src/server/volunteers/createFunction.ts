import { z } from 'zod'

import { MAX_FIELD_LENGTH, prisma } from '@/constants'
import type { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'

export const createFunction = async ({ role, events }: VolunteersFunctionsForm) => {
	try {
		z.object({
			events: z.array(
				z.object({
					id: z.uuid(),
				})
			),
			role: z.string().trim().min(1).max(MAX_FIELD_LENGTH),
		}).parse({ events, role })

		return prisma.$transaction(async (tx) => {
			const newRole = await tx.volunteerRole.create({
				data: { role },
			})

			await Promise.all(
				events.map(({ id }) =>
					tx.eventVolunteerRole.create({
						data: {
							eventId: id,
							volunteerRoleId: newRole.id,
						},
					})
				)
			)
		})
	} catch (error) {
		console.error('@createFunction error:', error)
		throw Error
	}
}
