import { z } from 'zod'

import { PaymentTypeAPI, prisma } from '@/constants'

export type UpdateVolunteerPaymentArgs = {
	paymentId: string
	values: {
		paymentType: (typeof PaymentTypeAPI)['CARD' | 'CASH' | 'PIX' | 'DONATION']
		paymentValue?: number
	}
}

export const updateVolunteerPayment = async ({
	paymentId,
	values,
}: UpdateVolunteerPaymentArgs) => {
	try {
		z.object({
			paymentId: z.string().uuid(),
			paymentType: z.enum([
				PaymentTypeAPI.CARD,
				PaymentTypeAPI.CASH,
				PaymentTypeAPI.PIX,
				PaymentTypeAPI.DONATION,
			]),
			paymentValue: z.number().optional(),
		}).parse({ paymentId, ...values })

		return await prisma.volunteerPayment.update({
			where: {
				id: paymentId,
			},
			data: {
				...values,
			},
		})
	} catch (error) {
		console.error('@updateVolunteerPaymentById error:', error)
		throw Error
	}
}
