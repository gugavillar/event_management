import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const getGroupById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.group.findUnique({
			include: {
				members: true,
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@getGroupById error:', error)
		throw Error
	}
}
