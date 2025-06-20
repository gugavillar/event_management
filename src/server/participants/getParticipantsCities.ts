import { prisma } from '@/constants'

export const getParticipantsCities = async () => {
	try {
		return await prisma.participantAddress.groupBy({
			by: ['city'],
			orderBy: {
				city: 'asc',
			},
		})
	} catch (error) {
		console.error('@getParticipantsCities error:', error)
		throw Error
	}
}
