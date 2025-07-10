import { z } from 'zod'

import { prisma } from '@/constants'

export type ReturnPaymentVolunteerArgs = {
	paymentId: string
	values: {
		returnValue?: number
	}
}

const generateData = (paidValue: number, returnValue?: number) => {
	if (!returnValue || returnValue >= paidValue) {
		return {
			paymentValue: 0,
			paymentType: null,
		}
	}

	return {
		paymentValue: paidValue - returnValue,
	}
}

export const returnPaymentVolunteer = async ({
	paymentId,
	values,
}: ReturnPaymentVolunteerArgs) => {
	let returnPayment = {}

	try {
		z.object({
			paymentId: z.string().uuid(),
			paymentValue: z.number().optional(),
		}).parse({ paymentId, ...values })

		const payment = await prisma.volunteerPayment.findUnique({
			where: {
				id: paymentId,
			},
		})

		if (payment && values.returnValue) {
			returnPayment = generateData(
				payment.paymentValue.toNumber(),
				values.returnValue,
			)
		}

		console.log('VALUES', values)

		return await prisma.volunteerPayment.update({
			where: {
				id: paymentId,
			},
			data: {
				...returnPayment,
			},
		})
	} catch (error) {
		console.error('@returnPaymentVolunteer error:', error)
		throw Error
	}
}
