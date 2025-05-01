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

		return await prisma.volunteer.update({
			where: {
				id: volunteerId,
			},
			data: {
				checkIn: status,
			},
		})
	} catch (error) {
		console.error('@updateCheckInVolunteer error:', error)
		throw Error
	}
}
