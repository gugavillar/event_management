import { CHECK_IN_STATUS, prisma } from '@/constants'

export const getAllParticipants = async (
	eventId: string | null,
	search: string | null,
	status: CHECK_IN_STATUS | null,
) => {
	try {
		return await prisma.participant.findMany({
			where: {
				...(eventId && { eventId }),
				...(search && { name: { startsWith: search } }),
				...(status && {
					checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
				}),
			},
			include: {
				Address: true,
				event: true,
			},
			orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
