import { z } from 'zod'

import { prisma } from '@/constants'

export const removeVolunteerById = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.volunteer.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeVolunteerById error:', error)
		throw Error
	}
}
