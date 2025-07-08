import { LIMIT_PER_PAGE, prisma } from '@/constants'

export const getAllEvents = async (search: string | null, page = 1) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [events, totalOfEvents] = await Promise.all([
			prisma.event.findMany({
				...(search && {
					where: {
						name: { contains: search },
					},
				}),
				orderBy: !search ? { createdAt: 'desc' } : { name: 'asc' },
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.event.count({
				...(search && {
					where: {
						name: { contains: search },
					},
				}),
			}),
		])

		return {
			data: events,
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfEvents,
			totalPages: Math.ceil(totalOfEvents / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllEvents error:', error)
		throw Error
	}
}
