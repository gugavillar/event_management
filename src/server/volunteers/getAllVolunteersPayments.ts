import { PaymentTypeAPI, prisma } from '@/constants'

export const getAllVolunteersPayments = async (
	eventId: string | null,
	search: string | null,
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null,
) => {
	try {
		return await prisma.volunteerPayment.findMany({
			where: {
				...(eventId && { eventId }),
				...(search && { volunteer: { name: { startsWith: search } } }),
				...(paymentType && {
					paymentType: paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
				}),
			},
			include: {
				event: true,
				volunteer: true,
			},
			orderBy: [{ volunteer: { name: 'asc' } }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllVolunteersPayments error:', error)
		throw Error
	}
}
