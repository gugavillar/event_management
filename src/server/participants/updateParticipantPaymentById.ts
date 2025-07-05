import { z } from 'zod'

import { PaymentTypeAPI, prisma } from '@/constants'

export type UpdateParticipantPaymentArgs = {
	paymentId: string
	values: {
		paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
		paymentValue?: number
	}
}

export const updateParticipantPaymentById = async ({
	paymentId,
	values,
}: UpdateParticipantPaymentArgs) => {
	try {
		z.object({
			paymentId: z.string().uuid(),
			paymentType: z.enum([
				PaymentTypeAPI.CARD,
				PaymentTypeAPI.CASH,
				PaymentTypeAPI.PIX,
				PaymentTypeAPI.DONATION,
				PaymentTypeAPI.DONATION_ROMERO,
			]),
			paymentValue: z.number().optional(),
		}).parse({ paymentId, ...values })

		return await prisma.participantPayment.update({
			where: {
				id: paymentId,
			},
			data: {
				...values,
			},
		})
	} catch (error) {
		console.error('@updateParticipantPaymentById error:', error)
		throw Error
	}
}
