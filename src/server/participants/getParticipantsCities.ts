import { prisma } from '@/lib/prisma'

export const getParticipantsCities = async (isInterested: boolean | null, eventId: string | null) => {
	try {
		return await prisma.participantAddress.groupBy({
			by: ['city'],
			orderBy: {
				city: 'asc',
			},
			where: {
				participant: {
					...(eventId && { eventId }),
					...(isInterested
						? { interested: true }
						: {
								OR: [{ interested: false }, { interested: null }],
							}),
				},
			},
		})
	} catch (error) {
		console.error('@getParticipantsCities error:', error)
		throw Error
	}
}
