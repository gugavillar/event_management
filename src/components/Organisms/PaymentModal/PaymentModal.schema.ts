import { z } from 'zod'

import { PaymentTypeAPI } from '@/constants'
import { currencyValue, removeCurrencyFormat } from '@/formatters'

import { paymentOptionsRadio } from './PaymentModal.utils'

export const PaymentModalSchema = (maxPaidValue: number, paidValue: number) =>
	z
		.object({
			paid: z.enum(
				[
					paymentOptionsRadio(false)[0].value,
					paymentOptionsRadio(false)[1].value,
				],
				{
					required_error: 'Campo obrigatório',
					message: 'Campo obrigatório',
				},
			),
			paymentType: z
				.union([
					z.enum(
						[
							PaymentTypeAPI.CARD,
							PaymentTypeAPI.CASH,
							PaymentTypeAPI.PIX,
							PaymentTypeAPI.DONATION,
							PaymentTypeAPI.DONATION_ROMERO,
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
							PaymentTypeAPI.DONATION_ROMERO,
						].includes(val as PaymentTypeAPI),
					{
						message: 'Campo obrigatório',
					},
				),
			paymentValue: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			if (data.paymentValue) {
				const totalPaid =
					Number(removeCurrencyFormat(data.paymentValue)) + paidValue
				const limitValue = maxPaidValue - paidValue
				if (totalPaid > maxPaidValue) {
					ctx.addIssue({
						path: ['paymentValue'],
						code: z.ZodIssueCode.custom,
						message: `O valor inserido excede o valor restante de ${currencyValue(limitValue)}`,
					})
				}
			}
			if (
				data.paid === paymentOptionsRadio(false)[1].value &&
				(!data.paymentValue || data.paymentValue.trim() === '')
			) {
				ctx.addIssue({
					path: ['paymentValue'],
					code: z.ZodIssueCode.custom,
					message: 'Campo obrigatório',
				})
			}
		})

export type PaymentModalType = z.infer<ReturnType<typeof PaymentModalSchema>>
