import { z } from 'zod'

import { prisma } from '@/constants'

export const getGroupByEventId = async (id: string) => {
	try {
		z.object({
			id: z.string().uuid(),
		}).parse({ id })

		return await prisma.group.findMany({
			where: {
				eventId: id,
			},
			include: {
				members: {
					include: { participant: true, volunteer: true },
				},
				event: true,
			},
		})
	} catch (error) {
		console.error('@getGroupByEventId error:', error)
		throw Error
	}
}
