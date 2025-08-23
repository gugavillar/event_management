import { LIMIT_PER_PAGE, prisma } from '@/constants'

export const getAllDonations = async (eventId: string | null, page = 1) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [donations, totalOfDonations, sumOfAllDonations] = await Promise.all([
			prisma.donation.findMany({
				...(eventId && {
					where: {
						eventId,
					},
				}),
				include: {
					event: true,
				},
				orderBy: { createdAt: 'asc' },
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.donation.count({
				...(eventId && {
					where: {
						eventId,
					},
				}),
			}),
			prisma.donation.aggregate({
				_sum: {
					value: true,
				},
				...(eventId && {
					where: {
						eventId,
					},
				}),
			}),
		])

		return {
			data: donations,
			sumOfAllDonations: sumOfAllDonations._sum.value?.toNumber(),
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfDonations,
			totalPages: Math.ceil(totalOfDonations / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllDonations error:', error)
		throw Error
	}
}
