import { z } from 'zod'

import { prisma } from '@/constants'

export const updateVolunteerFunction = async (
	roles: Array<{ roleId: string; isLeader: boolean }>,
	id: string,
) => {
	try {
		z.object({
			id: z.string().uuid(),
			roles: z.array(
				z.object({
					roleId: z.string().uuid(),
					isLeader: z.boolean(),
				}),
			),
		}).parse({ id, roles })

		return await prisma.$transaction(async (tx) => {
			await tx.volunteer.update({
				where: { id },
				data: {
					volunteerRole: { set: [] },
				},
			})

			const allRoles = await tx.volunteerRole.findMany({
				where: {
					leaderId: id,
				},
			})

			if (allRoles.length) {
				for (const role of allRoles) {
					await tx.volunteerRole.update({
						where: { id: role.id },
						data: {
							leader: {
								disconnect: { id },
							},
						},
					})
				}
			}

			for (const { roleId, isLeader } of roles) {
				await tx.volunteer.update({
					where: { id },
					data: {
						volunteerRole: {
							connect: { id: roleId },
						},
					},
				})

				const role = await tx.volunteerRole.findUnique({
					where: {
						id: roleId,
					},
				})

				if (isLeader && role?.leaderId !== id) {
					await tx.volunteerRole.update({
						where: { id: roleId },
						data: {
							leader: {
								connect: { id },
							},
						},
					})
				}
			}
		})
	} catch (error) {
		console.error('@updateVolunteerFunction error:', error)
		throw Error
	}
}
