import { z } from 'zod'

import { GenderTypeAPI } from '@/constants'
import { isEqualOrIsBeforeFirstDate, isValidateDate } from '@/formatters'

export const EventSchema = z
	.object({
		name: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.min(3, 'Campo obrigatório'),
		gender: z
			.union([
				z.enum([GenderTypeAPI.MALE, GenderTypeAPI.FEMALE, GenderTypeAPI.BOTH], {
					required_error: 'Campo obrigatório',
					message: 'Campo obrigatório',
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
				{ message: 'Campo obrigatório' },
			),
		initialDate: z
			.string({ required_error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
				{ message: 'A data não é valida' },
			),
		finalDate: z
			.string({ required_error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? isValidateDate(value) : false,
				{ message: 'A data não é valida' },
			),
		participantPrice: z
			.string({
				required_error: 'Campo obrigatório',
			})
			.min(1, 'Campo obrigatório'),
		volunteerPrice: z
			.string({
				required_error: 'Campo obrigatório',
			})
			.min(1, 'Campo obrigatório'),
	})
	.refine(
		(data) => isEqualOrIsBeforeFirstDate(data.initialDate, data.finalDate),
		{
			message: 'Data inicial deve ser menor que a data final',
			path: ['finalDate'],
		},
	)

export type EventSchemaType = z.infer<typeof EventSchema>
