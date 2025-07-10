import {
	CHECK_IN_STATUS,
	LIMIT_PER_PAGE,
	NO_FUNCTION,
	prisma,
} from '@/constants'

export const getAllVolunteers = async (
	eventId: string | null,
	search: string | null,
	status: CHECK_IN_STATUS | null,
	role: string | null,
	hasNoGroup: boolean,
	hasNoRoom: boolean,
	city: string | null,
	page = 1,
	limit = LIMIT_PER_PAGE,
) => {
	try {
		const skip = (page - 1) * limit

		const [volunteers, totalOfVolunteers] = await Promise.all([
			prisma.volunteer.findMany({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(status && {
						checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
					}),
					...(role && {
						eventRoles:
							role === NO_FUNCTION.value
								? { none: {} }
								: {
										some: {
											volunteerRole: {
												role: { contains: role },
											},
										},
									},
					}),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
					...(hasNoGroup && { groupMemberships: { none: {} } }),
					...(hasNoRoom && { roomMember: { none: {} } }),
				},
				include: {
					address: true,
					event: true,
					eventRoles: {
						include: {
							leaders: true,
							volunteerRole: true,
						},
					},
				},
				orderBy: { name: 'asc' },
				skip,
				take: limit,
			}),
			prisma.volunteer.count({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(status && {
						checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
					}),
					...(role && {
						eventRoles:
							role === NO_FUNCTION.value
								? { none: {} }
								: {
										some: {
											volunteerRole: {
												role: { contains: role },
											},
										},
									},
					}),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
					...(hasNoGroup && { groupMemberships: { none: {} } }),
					...(hasNoRoom && { roomMember: { none: {} } }),
				},
			}),
		])

		return {
			data: volunteers,
			currentPage: page,
			perPage: limit,
			totalCount: totalOfVolunteers,
			totalPages: Math.ceil(totalOfVolunteers / limit),
		}
	} catch (error) {
		console.error('@getAllVolunteers error:', error)
		throw Error
	}
}
