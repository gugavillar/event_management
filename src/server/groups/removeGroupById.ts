import { z } from 'zod'

import { prisma } from '@/constants'

export const removeGroupById = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.group.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeGroupById error:', error)
		throw Error
	}
}
