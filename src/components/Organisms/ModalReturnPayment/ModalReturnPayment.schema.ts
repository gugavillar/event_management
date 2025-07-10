import { z } from 'zod'

import { paymentOptionsRadio } from './ModalReturnPayment.utils'

const paymentOption = paymentOptionsRadio(false)

export const ModalReturnPaymentSchema = z
	.object({
		returnPaid: z.enum([paymentOption[0].value, paymentOption[1].value], {
			required_error: 'Campo obrigatório',
			message: 'Campo obrigatório',
		}),
		returnValue: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (
			data.returnPaid === paymentOption[1].value &&
			(!data.returnValue || data.returnValue.trim() === '')
		) {
			ctx.addIssue({
				path: ['returnValue'],
				code: z.ZodIssueCode.custom,
				message: 'Campo obrigatório',
			})
		}
	})

export type ModalReturnPaymentType = z.infer<typeof ModalReturnPaymentSchema>
