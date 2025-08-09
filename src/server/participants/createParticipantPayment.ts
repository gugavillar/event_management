import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MIN_CURRENCY_VALUE,
	PaymentTypeAPI,
	prisma,
} from '@/constants'

export type CreateParticipantPaymentArgs = {
	paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
	paymentValue: number
	eventId: string
	participantId: string
}

export const createParticipantPayment = async (
	values: CreateParticipantPaymentArgs,
) => {
	try {
		z.object({
			paymentType: z.enum([
				PaymentTypeAPI.CARD,
				PaymentTypeAPI.CASH,
				PaymentTypeAPI.PIX,
				PaymentTypeAPI.DONATION,
				PaymentTypeAPI.DONATION_ROMERO,
			]),
			paymentValue: z.coerce
				.number()
				.min(MIN_CURRENCY_VALUE)
				.max(MAX_CURRENCY_VALUE),
			eventId: z.uuid(),
			participantId: z.uuid(),
		}).parse({ ...values })

		return await prisma.participantPayment.create({
			data: {
				...values,
			},
		})
	} catch (error) {
		console.error('@createParticipantPayment error:', error)
		throw Error
	}
}
