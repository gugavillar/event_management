import { z } from 'zod'

import { TransactionAmountType, TransactionsType } from '@/constants'
import { isValidateDate } from '@/formatters'
import { AMOUNT_TYPE, TRANSACTION_TYPE } from './TransactionDrawer.utils'

export const TransactionSchema = z.object({
	amount: z
		.string({
			error: 'Campo obrigatório',
		})
		.min(1, 'Campo obrigatório'),
	amountType: z
		.union([
			z.enum([...AMOUNT_TYPE.map(({ value }) => value)], {
				error: 'Campo obrigatório',
			}),
			z.string(),
		])
		.refine((value) =>
			[TransactionAmountType.ACCOUNT, TransactionAmountType.CASH].includes(
				value as TransactionAmountType
			)
		),
	date: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
		.refine(
			(value) =>
				/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
			{ error: 'A data não é valida' }
		),
	description: z.string().trim().min(3, 'Campo obrigatório'),
	type: z
		.union([
			z.enum([...TRANSACTION_TYPE.map(({ value }) => value)], {
				error: 'Campo obrigatório',
			}),
			z.string(),
		])
		.refine(
			(value) =>
				[TransactionsType.INCOME, TransactionsType.OUTCOME].includes(
					value as TransactionsType
				),
			{ error: 'Campo obrigatório' }
		),
})

export type TransactionType = z.infer<typeof TransactionSchema>
