import { CHECK_IN_STATUS, LIMIT_PER_PAGE, prisma } from '@/constants'

export const getAllParticipants = async (
	eventId: string | null,
	search: string | null,
	status: CHECK_IN_STATUS | null,
	hasNoGroup: boolean | null,
	hasNoRoom: boolean | null,
	city: string | null,
	page = 1,
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [participants, totalOfParticipants] = await Promise.all([
			prisma.participant.findMany({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(status && {
						checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
					}),
					...(hasNoGroup && { groupMemberships: { none: {} } }),
					...(hasNoRoom && { roomMember: { none: {} } }),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
				},
				include: {
					address: true,
					event: true,
				},
				orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.participant.count({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(status && {
						checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
					}),
					...(hasNoGroup && { groupMemberships: { none: {} } }),
					...(hasNoRoom && { roomMember: { none: {} } }),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
				},
			}),
		])

		return {
			data: participants,
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfParticipants,
			totalPages: Math.ceil(totalOfParticipants / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
