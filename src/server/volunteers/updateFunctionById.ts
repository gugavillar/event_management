import { z } from 'zod'

import { MAX_FIELD_LENGTH, prisma } from '@/constants'

export const updateFunctionById = async (
	data: { role: string; events: Array<{ id: string }> },
	roleId: string,
) => {
	try {
		z.object({
			roleId: z.uuid(),
			role: z.string().trim().min(1).max(MAX_FIELD_LENGTH),
			events: z.array(z.object({ id: z.uuid() })),
		}).parse({ roleId, ...data })

		const updateEvents = data.events.map((e) => e.id)

		return await prisma.$transaction(async (tx) => {
			await tx.volunteerRole.update({
				where: { id: roleId },
				data: {
					role: data.role,
				},
			})

			const currentLinks = await tx.eventVolunteerRole.findMany({
				where: { volunteerRoleId: roleId },
			})

			const existentEvents = currentLinks.map((e) => e.eventId)

			const toRemove = currentLinks.filter(
				(evr) => !updateEvents.includes(evr.eventId),
			)
			const toAdd = updateEvents.filter(
				(eventId) => !existentEvents.includes(eventId),
			)

			await Promise.all(
				toRemove.map(({ id }) =>
					tx.eventVolunteerRole.delete({
						where: { id },
					}),
				),
			)

			await Promise.all(
				toAdd.map((eventId) =>
					tx.eventVolunteerRole.create({
						data: {
							eventId,
							volunteerRoleId: roleId,
						},
					}),
				),
			)
		})
	} catch (error) {
		console.error('@updateFunctionById error:', error)
		throw Error
	}
}
