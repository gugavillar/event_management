import { PaymentTypeAPI, prisma } from '@/constants'

export const getAllParticipantsPayments = async (
	eventId: string | null,
	search: string | null,
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null,
) => {
	try {
		return await prisma.participantPayment.findMany({
			where: {
				...(eventId && { eventId }),
				...(search && { participant: { name: { startsWith: search } } }),
				...(paymentType && {
					paymentType: paymentType !== PaymentTypeAPI.OPEN ? paymentType : null,
				}),
			},
			include: {
				event: true,
				participant: true,
			},
			orderBy: [{ participant: { name: 'asc' } }, { createdAt: 'desc' }],
		})
	} catch (error) {
		console.error('@getAllParticipantsPayments error:', error)
		throw Error
	}
}
