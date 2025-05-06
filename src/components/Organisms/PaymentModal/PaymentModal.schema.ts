import { z } from 'zod'

import { PaymentTypeAPI } from '@/constants'

import { paymentOptionsRadio } from './PaymentModal.utils'

export type PaymentType = 'CARD' | 'CASH' | 'PIX' | 'DONATION'

export const PaymentModalSchema = z
	.object({
		paid: z.enum([paymentOptionsRadio[0].value, paymentOptionsRadio[1].value], {
			required_error: 'Campo obrigatório',
			message: 'Campo obrigatório',
		}),
		paymentType: z
			.union([
				z.enum(
					[
						PaymentTypeAPI.CARD,
						PaymentTypeAPI.CASH,
						PaymentTypeAPI.PIX,
						PaymentTypeAPI.DONATION,
					],
					{
						required_error: 'Campo obrigatório',
						message: 'Campo obrigatório',
					},
				),
				z.string(),
			])
			.refine(
				(val) =>
					[
						PaymentTypeAPI.CARD,
						PaymentTypeAPI.CASH,
						PaymentTypeAPI.PIX,
						PaymentTypeAPI.DONATION,
					].includes(val as PaymentType),
				{
					message: 'Campo obrigatório',
				},
			),
		paymentValue: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (
			data.paid === paymentOptionsRadio[1].value &&
			(!data.paymentValue || data.paymentValue.trim() === '')
		) {
			ctx.addIssue({
				path: ['paymentValue'],
				code: z.ZodIssueCode.custom,
				message: 'Campo obrigatório',
			})
		}
	})

export type PaymentModalType = z.infer<typeof PaymentModalSchema>
