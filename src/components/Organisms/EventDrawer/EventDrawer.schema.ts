import { z } from 'zod'

import { GenderTypeAPI } from '@/constants'
import {
	isEqualOrIsBeforeFirstDate,
	validateDateAndFutureDate,
} from '@/formatters'

export const EventSchema = z
	.object({
		name: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.min(3, 'Campo obrigatório'),
		gender: z.enum(
			[GenderTypeAPI.MALE, GenderTypeAPI.FEMALE, GenderTypeAPI.BOTH],
			{
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			},
		),
		initialDate: z
			.string({ required_error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value)
						? validateDateAndFutureDate(value)
						: false,
				{ message: 'A data não é valida' },
			),
		finalDate: z
			.string({ required_error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value)
						? validateDateAndFutureDate(value)
						: false,
				{ message: 'A data não é valida' },
			),
		participantValue: z
			.string({
				required_error: 'Campo obrigatório',
			})
			.min(1, 'Campo obrigatório'),
		volunteerValue: z
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
