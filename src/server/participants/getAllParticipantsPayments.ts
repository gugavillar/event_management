import { LIMIT_PER_PAGE, PaymentTypeAPI, prisma } from '@/constants'

export const getAllParticipantsPayments = async (
	eventId: string | null,
	search: string | null,
	city: string | null,
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null,
	page = 1,
) => {
	try {
		const skip = (page - 1) * LIMIT_PER_PAGE

		const [payments, totalOfPayments] = await Promise.all([
			prisma.participantPayment.findMany({
				where: {
					...(eventId && { eventId }),
					...(search && { participant: { name: { contains: search } } }),
					...(paymentType && {
						paymentType:
							paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
					}),
					...(city && {
						participant: {
							address: {
								city: { contains: city },
							},
						},
					}),
					OR: [
						{ participant: { interested: false } },
						{ participant: { interested: null } },
					],
				},
				include: {
					event: true,
					participant: true,
				},
				orderBy: [{ participant: { name: 'asc' } }, { createdAt: 'desc' }],
				skip,
				take: LIMIT_PER_PAGE,
			}),
			prisma.participantPayment.count({
				where: {
					...(eventId && { eventId }),
					...(search && { participant: { name: { contains: search } } }),
					...(paymentType && {
						paymentType:
							paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
					}),
					...(city && {
						participant: {
							address: {
								city: { contains: city },
							},
						},
					}),
					OR: [
						{ participant: { interested: false } },
						{ participant: { interested: null } },
					],
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
		console.error('@getAllParticipantsPayments error:', error)
		throw Error
	}
}
