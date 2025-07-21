import { z } from 'zod'

import { GenderTypeAPI } from '@/constants'
import { isEqualOrIsBeforeFirstDate, isValidateDate } from '@/formatters'

export const EventSchema = z
	.object({
		name: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.min(3, 'Campo obrigatório'),
		gender: z
			.union([
				z.enum([GenderTypeAPI.MALE, GenderTypeAPI.FEMALE, GenderTypeAPI.BOTH], {
					error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine(
				(value) =>
					[
						GenderTypeAPI.MALE,
						GenderTypeAPI.FEMALE,
						GenderTypeAPI.BOTH,
					].includes(value as GenderTypeAPI),
				{ error: 'Campo obrigatório' },
			),
		initialDate: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
				{ error: 'A data não é valida' },
			),
		finalDate: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { error: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
				{ error: 'A data não é valida' },
			),
		participantPrice: z
			.string({
				error: 'Campo obrigatório',
			})
			.min(1, 'Campo obrigatório'),
		volunteerPrice: z
			.string({
				error: 'Campo obrigatório',
			})
			.min(1, 'Campo obrigatório'),
		minAge: z.string().optional(),
		maxAge: z.string().optional(),
	})
	.refine(
		(data) => isEqualOrIsBeforeFirstDate(data.initialDate, data.finalDate),
		{
			error: 'Data inicial deve ser menor que a data final',
			path: ['finalDate'],
		},
	)
	.refine(
		(data) => {
			if (data.minAge && data.maxAge) {
				return Number(data.minAge) <= Number(data.maxAge)
			}
			return true
		},
		{
			error: 'Idade mínima deve ser menor que a idade máxima',
			path: ['maxAge'],
		},
	)

export type EventSchemaType = z.infer<typeof EventSchema>
