import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const removeRoomById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.room.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeRoomById error:', error)
		throw Error
	}
}
