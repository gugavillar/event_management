import { z } from 'zod'

import {
	MAX_CURRENCY_VALUE,
	MIN_CURRENCY_VALUE,
	PaymentTypeAPI,
	prisma,
} from '@/constants'

export type CreateVolunteerPaymentArgs = {
	paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
	paymentValue: number
	eventId: string
	volunteerId: string
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
		}).parse({ ...values })

		return await prisma.volunteerPayment.create({
			data: {
				...values,
			},
		})
	} catch (error) {
		console.error('@createVolunteerPayment error:', error)
		throw Error
	}
}
