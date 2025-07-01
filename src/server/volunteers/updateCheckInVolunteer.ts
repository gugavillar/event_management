import { z } from 'zod'

import { CHECK_IN_STATUS, prisma } from '@/constants'

export type UpdateCheckInVolunteerArgs = {
	volunteerId: string
	status: (typeof CHECK_IN_STATUS)['CONFIRMED' | 'WITHDREW']
}

export const updateCheckInVolunteer = async ({
	volunteerId,
	status,
}: UpdateCheckInVolunteerArgs) => {
	try {
		z.object({
			volunteerId: z.string().uuid(),
			status: z.enum([CHECK_IN_STATUS.CONFIRMED, CHECK_IN_STATUS.WITHDREW]),
		}).parse({ volunteerId, status })

		if (status === CHECK_IN_STATUS.CONFIRMED) {
			return await prisma.volunteer.update({
				where: {
					id: volunteerId,
				},
				data: {
					checkIn: CHECK_IN_STATUS.CONFIRMED,
				},
			})
		}

		return await prisma.$transaction(async (tx) => {
			const isVolunteerInRoom = await tx.roomMember.findFirst({
				where: {
					volunteerId,
				},
			})

			if (isVolunteerInRoom) {
				await tx.roomMember.deleteMany({
					where: {
						volunteerId,
					},
				})
			}

			const isVolunteerInGroup = await tx.groupMember.findFirst({
				where: {
					volunteerId,
				},
			})

			if (isVolunteerInGroup) {
				await tx.groupMember.deleteMany({
					where: {
						volunteerId,
					},
				})
			}

			const volunteerRoles = await tx.eventVolunteerRole.findMany({
				where: {
					volunteers: {
						some: { id: volunteerId },
					},
				},
			})

			if (volunteerRoles.length) {
				for (const { id: eventVolunteerRoleId } of volunteerRoles) {
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
			}

			return await tx.volunteer.update({
				where: {
					id: volunteerId,
				},
				data: {
					checkIn: CHECK_IN_STATUS.WITHDREW,
				},
			})
		})
	} catch (error) {
		console.error('@updateCheckInVolunteer error:', error)
		throw Error
	}
}
