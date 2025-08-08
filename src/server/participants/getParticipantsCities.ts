import { prisma } from '@/constants'

export const getParticipantsCities = async (
	isInterested: boolean | null,
	eventId: string | null,
) => {
	try {
		return await prisma.participantAddress.groupBy({
			by: ['city'],
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
			orderBy: {
				city: 'asc',
			},
		})
	} catch (error) {
		console.error('@getParticipantsCities error:', error)
		throw Error
	}
}
