import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const VolunteerSchema = z
	.object({
		eventId: z.string().trim().min(1, 'Campo obrigatório'),
		name: z.string().trim().min(1, 'Campo obrigatório'),
		email: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.email({ message: 'Email inválido' })
			.refine((value) => validateEmail(value), { message: 'Email inválido' }),
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
		relative: z.string().trim().min(1, 'Campo obrigatório'),
		relativePhone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ message: 'Telefone inválido' },
			),
		hasCell: z
			.union([
				z.enum(['Yes', 'No'], {
					required_error: 'Campo obrigatório',
					message: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['Yes', 'No'].includes(value), {
				message: 'Campo obrigatório',
			}),
		cell: z.string().nullable().optional(),
		hasHealth: z
			.union([
				z.enum(['Yes', 'No'], {
					required_error: 'Campo obrigatório',
					message: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['Yes', 'No'].includes(value), {
				message: 'Campo obrigatório',
			}),
		health: z.string().nullable().optional(),
		community: z.string().trim().min(1, 'Campo obrigatório'),
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
		if (value.hasCell === 'Yes' && !value.cell?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['cell'],
			})
		}
		if (value.hasHealth === 'Yes' && !value.health?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['health'],
			})
		}
		validatePhonesNotEquals(
			value.phone,
			[{ field: 'relativePhone', phone: value.relativePhone }],
			ctx,
		)
	})

export type VolunteerType = z.infer<typeof VolunteerSchema>
