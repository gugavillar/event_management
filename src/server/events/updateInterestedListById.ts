import { z } from 'zod'

import { prisma } from '@/constants'

export const updateInterestedListById = async (
	id: string,
	action: 'open' | 'close',
) => {
	try {
		z.object({
			id: z.string().uuid(),
			action: z.enum(['open', 'close']),
		}).parse({ id, action })

		return await prisma.event.update({
			data: {
				isInterestedListOpen: action === 'open',
			},
			where: {
				id,
			},
		})
	} catch (error) {
		console.error('@updateInterestedListById error:', error)
		throw Error
	}
}
