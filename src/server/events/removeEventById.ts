import { z } from 'zod'

import { prisma } from '@/constants'

export const removeEventById = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.event.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeEventById error:', error)
		throw Error
	}
}
