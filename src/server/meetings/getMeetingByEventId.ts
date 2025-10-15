import { z } from 'zod'

import { prisma } from '@/constants'

export const getMeetingByEventId = async (eventId: string) => {
	try {
		z.object({
			eventId: z.uuid(),
		}).parse({ eventId })

		return await prisma.meetings.findMany({
			orderBy: {
				title: 'asc',
			},
			where: {
				eventId,
			},
		})
	} catch (error) {
		console.error('@getMeetingByEventId error:', error)
		throw Error
	}
}
