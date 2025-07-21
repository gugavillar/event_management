import { z } from 'zod'

import { prisma } from '@/constants'

export const updateVolunteerFunction = async (
	data: {
		eventId: string
		roles: Array<{ roleId: string; isLeader: boolean }>
	},
	volunteerId: string,
	onlyRemove?: boolean,
) => {
	try {
		z.object({
			volunteerId: z.uuid(),
			eventId: z.uuid(),
			roles: z.array(
				z.object({
					roleId: z.uuid(),
					isLeader: z.boolean(),
				}),
			),
			onlyRemove: z.boolean().optional(),
		}).parse({ volunteerId, ...data, onlyRemove })

		return await prisma.$transaction(async (tx) => {
			const eventRoles = await tx.eventVolunteerRole.findMany({
				where: {
					eventId: data.eventId,
				},
				select: {
					id: true,
				},
			})

			for (const { id: eventVolunteerRoleId } of eventRoles) {
				await tx.eventVolunteerRole.update({
					where: { id: eventVolunteerRoleId },
					data: {
						volunteers: {
							disconnect: { id: volunteerId },
						},
						leaders: {
							disconnect: { id: volunteerId },
						},
					},
				})
			}

			if (onlyRemove) return

			for (const { roleId, isLeader } of data.roles) {
				const evr = await tx.eventVolunteerRole.findFirst({
					where: {
						eventId: data.eventId,
						volunteerRoleId: roleId,
					},
				})

				if (!evr) continue

				await tx.eventVolunteerRole.update({
					where: { id: evr.id },
					data: {
						volunteers: {
							connect: { id: volunteerId },
						},
						...(isLeader && {
							leaders: {
								connect: { id: volunteerId },
							},
						}),
					},
				})
			}
		})
	} catch (error) {
		console.error('@updateVolunteerFunction error:', error)
		throw Error
	}
}
