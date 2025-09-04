import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MIN_CURRENCY_VALUE,
	PaymentTypeAPI,
	prisma,
	TransactionAmountType,
	TransactionsType,
} from '@/constants'

export type CreateVolunteerPaymentArgs = {
	paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
	paymentValue: number
	eventId: string
	volunteerId: string
	paymentReceived?: number
}

export const createVolunteerPayment = async (
	values: CreateVolunteerPaymentArgs,
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
			volunteerId: z.uuid(),
			paymentReceived: z.number().optional(),
		}).parse({ ...values })

		return await prisma.$transaction(async (tx) => {
			const payment = await tx.volunteerPayment.create({
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

			const volunteer = await tx.volunteer.findUnique({
				where: {
					id: values.volunteerId,
				},
			})

			await tx.transactions.create({
				data: {
					eventId: values.eventId,
					amount:
						values.paymentType === PaymentTypeAPI.CARD
							? (values.paymentReceived as number)
							: values.paymentValue,
					volunteerPaymentId: payment.id,
					date: new Date(),
					description: `Pagamento ficha - ${volunteer?.name}`,
					amountType:
						values.paymentType === PaymentTypeAPI.CASH
							? TransactionAmountType.CASH
							: TransactionAmountType.ACCOUNT,
					type: TransactionsType.INCOME,
				},
			})
		})
	} catch (error) {
		console.error('@createVolunteerPayment error:', error)
		throw Error
	}
}
