import { z } from 'zod'

import { prisma } from '@/constants'

export const getVolunteerById = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.volunteer.findUnique({
			where: {
				id,
			},
			include: {
				Address: true,
			},
		})
	} catch (error) {
		console.error('@getVolunteerById error:', error)
		throw Error
	}
}
