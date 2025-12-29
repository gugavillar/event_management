import { CHECK_IN_STATUS, LIMIT_PER_PAGE } from '@/constants'
import { prisma } from '@/lib/prisma'

export const getAllParticipants = async (
	eventId: string | null,
	search: string | null,
	status: CHECK_IN_STATUS | null,
	hasNoGroup: boolean,
	hasNoRoom: boolean,
	city: string | null,
	isInterested: boolean,
	page = 1,
	limit = LIMIT_PER_PAGE
) => {
	try {
		const skip = (page - 1) * limit

		const [participants, totalOfParticipants] = await Promise.all([
			prisma.participant.findMany({
				include: {
					address: true,
					event: true,
				},
				orderBy: isInterested === true ? { createdAt: 'asc' } : { name: 'asc' },
				skip,
				take: limit,
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
					...(!isInterested
						? {
								OR: [{ interested: false }, { interested: null }],
							}
						: {
								interested: true,
							}),
				},
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
					...(!isInterested
						? {
								OR: [{ interested: false }, { interested: null }],
							}
						: {
								interested: true,
							}),
				},
			}),
		])

		return {
			currentPage: page,
			data: participants,
			perPage: limit,
			totalCount: totalOfParticipants,
			totalPages: Math.ceil(totalOfParticipants / limit),
		}
	} catch (error) {
		console.error('@getAllParticipants error:', error)
		throw Error
	}
}
