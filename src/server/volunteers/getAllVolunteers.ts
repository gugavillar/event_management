import { CHECK_IN_STATUS, LIMIT_PER_PAGE, prisma } from '@/constants'

export const getAllVolunteers = async (
	eventId: string | null,
	search: string | null,
	status: CHECK_IN_STATUS | null,
	page = 1,
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [volunteers, totalOfVolunteers] = await Promise.all([
			prisma.volunteer.findMany({
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
					volunteerRole: true,
				},
				orderBy: [{ name: 'asc' }, { createdAt: 'desc' }],
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.volunteer.count({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { startsWith: search } }),
					...(status && {
						checkIn: status !== CHECK_IN_STATUS.NOT_ANSWERED ? status : null,
					}),
				},
			}),
		])

		return {
			data: volunteers,
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfVolunteers,
			totalPages: Math.ceil(totalOfVolunteers / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllVolunteers error:', error)
		throw Error
	}
}
