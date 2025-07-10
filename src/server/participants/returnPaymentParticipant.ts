import { z } from 'zod'

import { prisma } from '@/constants'

export type ReturnPaymentParticipantArgs = {
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

export const returnPaymentParticipant = async ({
	paymentId,
	values,
}: ReturnPaymentParticipantArgs) => {
	let returnPayment = {}

	try {
		z.object({
			paymentId: z.string().uuid(),
			paymentValue: z.number().optional(),
		}).parse({ paymentId, ...values })

		const payment = await prisma.participantPayment.findUnique({
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

		return await prisma.participantPayment.update({
			where: {
				id: paymentId,
			},
			data: {
				...returnPayment,
			},
		})
	} catch (error) {
		console.error('@returnPaymentParticipant error:', error)
		throw Error
	}
}
