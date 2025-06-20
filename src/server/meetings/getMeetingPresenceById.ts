import { z } from 'zod'

import { prisma } from '@/constants'

export const getMeetingPresenceById = async (meetingId: string) => {
	try {
		z.object({
			meetingId: z.string().uuid(),
		}).parse({ meetingId })

		return await prisma.meetingPresence.findMany({
			where: {
				meetingId,
			},
			orderBy: {
				volunteer: {
					name: 'asc',
				},
			},
		})
	} catch (error) {
		console.error('@getMeetingByEventId error:', error)
		throw Error
	}
}
