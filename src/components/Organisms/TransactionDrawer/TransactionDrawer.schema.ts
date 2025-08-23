import { z } from 'zod'

import { isValidateDate } from '@/formatters'

import { AMOUNT_TYPE, TRANSACTION_TYPE } from './TransactionDrawer.utils'

export const TransactionSchema = z.object({
	type: z.enum([...TRANSACTION_TYPE.map(({ value }) => value)], {
		error: 'Campo obrigatório',
	}),
	amount: z
		.string({
			error: 'Campo obrigatório',
		})
		.min(1, 'Campo obrigatório'),
	amountType: z.enum([...AMOUNT_TYPE.map(({ value }) => value)], {
		error: 'Campo obrigatório',
	}),
	description: z.string().trim().min(3, 'Campo obrigatório'),
	date: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
		.refine(
			(value) =>
				/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
			{ error: 'A data não é valida' },
		),
})

export type TransactionType = z.infer<typeof TransactionSchema>
