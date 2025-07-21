import { z } from 'zod'

import { prisma } from '@/constants'

export const getEventById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.event.findUnique({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getEventById error:', error)
		throw Error
	}
}
