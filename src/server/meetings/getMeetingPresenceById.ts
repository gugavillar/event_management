import { z } from 'zod'

import { prisma } from '@/constants'

export const getMeetingPresenceById = async (meetingId: string) => {
	try {
		z.object({
			meetingId: z.uuid(),
		}).parse({ meetingId })

		return await prisma.meetingPresence.findMany({
			orderBy: {
				volunteer: {
					name: 'asc',
				},
			},
			where: {
				meetingId,
			},
		})
	} catch (error) {
		console.error('@getMeetingByEventId error:', error)
		throw Error
	}
}
