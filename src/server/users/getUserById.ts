import z from 'zod'

import { prisma } from '@/lib/prisma'

export const getUserById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.user.findUnique({
			select: {
				role: true,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getUserById error:', error)
		throw Error
	}
}
