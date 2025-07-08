import { prisma } from '@/constants'

export const getParticipantsCities = async (isInterested: boolean | null) => {
	try {
		return await prisma.participantAddress.groupBy({
			by: ['city'],
			where: {
				...(!isInterested
					? {
							OR: [
								{ participant: { interested: false } },
								{ participant: { interested: null } },
							],
						}
					: {
							participant: {
								interested: true,
							},
						}),
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
