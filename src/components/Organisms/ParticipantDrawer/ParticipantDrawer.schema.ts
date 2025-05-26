import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ParticipantSchema = z
	.object({
		name: z.string().trim().min(1, 'Campo obrigatório'),
		email: z
			.string()
			.trim()
			.email({ message: 'Campo obrigatório' })
			.refine((value) => validateEmail(value)),
		called: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.min(1, 'Campo obrigatório'),
		birthdate: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value)
						? validateBirthdate(value)
						: false,
				{ message: 'Data inválida' },
			),
		phone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ message: 'Telefone inválido' },
			),
		responsible: z.string().trim().min(1, 'Campo obrigatório'),
		responsiblePhone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ message: 'Telefone inválido' },
			),
		hasReligion: z.enum(['Yes', 'No'], {
			required_error: 'Campo obrigatório',
		}),
		religion: z.string().optional(),
		host: z.string().trim().min(1, 'Campo obrigatório'),
		hostPhone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ message: 'Telefone inválido' },
			),
		address: z.object({
			street: z.string().trim().min(1, 'Campo obrigatório'),
			neighborhood: z.string().trim().min(1, 'Campo obrigatório'),
			number: z.string().trim().min(1, 'Campo obrigatório'),
			city: z.string().trim().min(1, 'Campo obrigatório'),
			state: z
				.string({ required_error: 'Campo obrigatório' })
				.max(2)
				.refine((value) => validateUF(value), {
					message: 'Campo obrigatório',
				}),
		}),
	})
	.superRefine((value, ctx) => {
		if (value.hasReligion === 'Yes' && !value.religion?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['religion'],
			})
		}
		validatePhonesNotEquals(
			[
				{ field: 'phone', phone: value.phone },
				{ field: 'responsiblePhone', phone: value.responsiblePhone },
				{ field: 'hostPhone', phone: value.hostPhone },
			],
			ctx,
		)
	})

export type ParticipantType = z.infer<typeof ParticipantSchema>
