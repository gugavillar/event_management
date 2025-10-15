import { z } from 'zod'

import { prisma } from '@/constants'

export const updateVolunteerFunction = async (
	data: {
		eventId: string
		roles: Array<{ roleId: string; isLeader: boolean }>
	},
	volunteerId: string,
	onlyRemove?: boolean
) => {
	try {
		z.object({
			eventId: z.uuid(),
			onlyRemove: z.boolean().optional(),
			roles: z.array(
				z.object({
					isLeader: z.boolean(),
					roleId: z.uuid(),
				})
			),
			volunteerId: z.uuid(),
		}).parse({ volunteerId, ...data, onlyRemove })

		return await prisma.$transaction(async (tx) => {
			const eventRoles = await tx.eventVolunteerRole.findMany({
				select: {
					id: true,
				},
				where: {
					eventId: data.eventId,
				},
			})

			for (const { id: eventVolunteerRoleId } of eventRoles) {
				await tx.eventVolunteerRole.update({
					data: {
						leaders: {
							disconnect: { id: volunteerId },
						},
						volunteers: {
							disconnect: { id: volunteerId },
						},
					},
					where: { id: eventVolunteerRoleId },
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
					where: { id: evr.id },
				})
			}
		})
	} catch (error) {
		console.error('@updateVolunteerFunction error:', error)
		throw Error
	}
}
