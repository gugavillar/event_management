import { z } from 'zod'

import { prisma } from '@/constants'
import { VolunteersFunctionsForm } from '@/services/queries/volunteers/volunteers.type'

export const createFunction = async ({
	role,
	events,
}: VolunteersFunctionsForm) => {
	try {
		z.object({
			role: z.string().min(1).max(191),
			events: z.array(
				z.object({
					id: z.string().uuid(),
				}),
			),
		}).parse({ role, events })

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
					}),
				),
			)
		})
	} catch (error) {
		console.error('@createFunction error:', error)
		throw Error
	}
}
