import { z } from 'zod'

import { prisma } from '@/constants'

export const updateFunctionById = async (
	data: { role: string },
	id: string,
) => {
	try {
		z.object({
			id: z.string().uuid(),
			role: z.string().min(1).max(255),
		}).parse({ id, ...data })

		return await prisma.volunteerRole.update({
			data,
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateFunctionById error:', error)
		throw Error
	}
}
