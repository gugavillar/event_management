import { z } from 'zod'

import { prisma } from '@/constants'

export const getVolunteerById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.volunteer.findUnique({
			include: {
				address: true,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getVolunteerById error:', error)
		throw Error
	}
}
