import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const removeFunctionById = async (id: string) => {
	try {
		z.object({
			id: z.uuid(),
		}).parse({ id })

		return await prisma.volunteerRole.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@removeFunctionById error:', error)
		throw Error
	}
}
