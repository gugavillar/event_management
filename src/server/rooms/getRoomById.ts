import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const getRoomById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.room.findUnique({
			include: {
				members: true,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getRoomById error:', error)
		throw Error
	}
}
