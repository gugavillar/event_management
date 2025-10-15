import { LIMIT_PER_PAGE, PaymentTypeAPI, prisma } from '@/constants'

export const getAllParticipantsPayments = async (
	eventId: string | null,
	search: string | null,
	city: string | null,
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null,
	page = 1
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [payments, totalOfPayments] = await Promise.all([
			prisma.participant.findMany({
				include: {
					event: true,
					payments: true,
				},
				orderBy: { name: 'asc' },
				skip,
				take: LIMIT_PER_PAGE,
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(paymentType && {
						payments: {
							...(paymentType !== PaymentTypeAPI.OPEN
								? {
										some: {
											paymentType,
										},
									}
								: {
										none: {},
									}),
						},
					}),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
					OR: [{ interested: false }, { interested: null }],
				},
			}),
			prisma.participant.count({
				where: {
					...(eventId && { eventId }),
					...(search && { name: { contains: search } }),
					...(paymentType && {
						payments: {
							...(paymentType !== PaymentTypeAPI.OPEN
								? {
										some: {
											paymentType,
										},
									}
								: {
										none: {},
									}),
						},
					}),
					...(city && {
						address: {
							city: { contains: city },
						},
					}),
					OR: [{ interested: false }, { interested: null }],
				},
			}),
		])

		return {
			currentPage: page,
			data: payments,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfPayments,
			totalPages: Math.ceil(totalOfPayments / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllParticipantsPayments error:', error)
		throw Error
	}
}
