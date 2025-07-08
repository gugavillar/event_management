import { LIMIT_PER_PAGE, PaymentTypeAPI, prisma } from '@/constants'

export const getAllVolunteersPayments = async (
	eventId: string | null,
	search: string | null,
	city: string | null,
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null,
	page = 1,
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [payments, totalOfPayments] = await Promise.all([
			prisma.volunteerPayment.findMany({
				where: {
					...(eventId && { eventId }),
					...(search && { volunteer: { name: { contains: search } } }),
					...(paymentType && {
						paymentType:
							paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
					}),
					...(city && {
						volunteer: {
							address: {
								city: { contains: city },
							},
						},
					}),
				},
				include: {
					event: true,
					volunteer: true,
				},
				orderBy: { volunteer: { name: 'asc' } },
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.volunteerPayment.count({
				where: {
					...(eventId && { eventId }),
					...(search && { volunteer: { name: { contains: search } } }),
					...(paymentType && {
						paymentType:
							paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
					}),
					...(city && {
						volunteer: {
							address: {
								city: { contains: city },
							},
						},
					}),
				},
			}),
		])

		return {
			data: payments,
			currentPage: page,
			perPage: LIMIT_PER_PAGE,
			totalCount: totalOfPayments,
			totalPages: Math.ceil(totalOfPayments / LIMIT_PER_PAGE),
		}
	} catch (error) {
		console.error('@getAllVolunteersPayments error:', error)
		throw Error
	}
}
