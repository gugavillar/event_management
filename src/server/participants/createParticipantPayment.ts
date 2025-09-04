import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MIN_CURRENCY_VALUE,
	PaymentTypeAPI,
	prisma,
	TransactionAmountType,
} from '@/constants'

export type CreateParticipantPaymentArgs = {
	paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
	paymentValue: number
	paymentReceived?: number
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
			paymentReceived: z.number().optional(),
		}).parse({ ...values })

		return await prisma.$transaction(async (tx) => {
			const payment = await tx.participantPayment.create({
				data: {
					...values,
				},
			})

			if (
				[PaymentTypeAPI.DONATION, PaymentTypeAPI.DONATION_ROMERO].includes(
					values.paymentType,
				)
			) {
				return
			}

			const participant = await tx.participant.findUnique({
				where: {
					id: values.participantId,
				},
			})

			await tx.transactions.create({
				data: {
					eventId: values.eventId,
					amount:
						values.paymentType === PaymentTypeAPI.CARD
							? (values.paymentReceived as number)
							: values.paymentValue,
					participantPaymentId: payment.id,
					date: new Date(),
					description: `Pagamento ficha - ${participant?.name}`,
					amountType:
						values.paymentType === PaymentTypeAPI.CASH
							? TransactionAmountType.CASH
							: TransactionAmountType.ACCOUNT,
					type: 'INCOME',
				},
			})
		})
	} catch (error) {
		console.error('@createParticipantPayment error:', error)
		throw Error
	}
}
