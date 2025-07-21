import { z } from 'zod'

import { prisma } from '@/constants'

export const getRoomById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.room.findUnique({
			where: {
				id,
			},
			include: {
				members: true,
			},
		})
	} catch (error) {
		console.error('@getRoomById error:', error)
		throw Error
	}
}
