import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ParticipantSchema = z
	.object({
		eventId: z.string().trim().min(1, 'Campo obrigatório'),
		name: z.string().trim().min(3, 'Campo obrigatório'),
		email: z
			.email({ message: 'Email inválido' })
			.trim()
			.refine((value) => validateEmail(value), { message: 'Email inválido' }),
		called: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.min(1, 'Campo obrigatório'),
		birthdate: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) =>
					/^\d{2}\/\d{2}\/\d{4}/g.test(value)
						? validateBirthdate(value)
						: false,
				{ message: 'Data inválida' },
			),
		phone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ error: 'Telefone inválido' },
			),
		responsible: z.string().trim().min(3, 'Campo obrigatório'),
		responsiblePhone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ error: 'Telefone inválido' },
			),
		hasReligion: z
			.union([
				z.enum(['Yes', 'No'], {
					error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['Yes', 'No'].includes(value), {
				error: 'Campo obrigatório',
			}),
		religion: z.string().nullable().optional(),
		hasHealth: z
			.union([
				z.enum(['Yes', 'No'], {
					error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['Yes', 'No'].includes(value), {
				error: 'Campo obrigatório',
			}),
		health: z.string().nullable().optional(),
		host: z.string().trim().min(3, 'Campo obrigatório'),
		hostPhone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ error: 'Telefone inválido' },
			),
		address: z.object({
			street: z.string().trim().min(3, 'Campo obrigatório'),
			neighborhood: z.string().trim().min(3, 'Campo obrigatório'),
			number: z.string().trim().min(1, 'Campo obrigatório'),
			city: z.string().trim().min(3, 'Campo obrigatório'),
			state: z
				.string({ error: 'Campo obrigatório' })
				.max(2)
				.refine((value) => validateUF(value), {
					error: 'Campo obrigatório',
				}),
		}),
	})
	.check((ctx) => {
		if (ctx.value.hasReligion === 'Yes' && !ctx.value.religion?.trim()) {
			ctx.issues.push({
				input: ctx.value,
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['religion'],
			})
		}
		if (ctx.value.hasHealth === 'Yes' && !ctx.value.health?.trim()) {
			ctx.issues.push({
				input: ctx.value,
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['health'],
			})
		}
		validatePhonesNotEquals(
			ctx.value.phone,
			[
				{ field: 'responsiblePhone', phone: ctx.value.responsiblePhone },
				{ field: 'hostPhone', phone: ctx.value.hostPhone },
			],
			ctx,
		)
	})

export type ParticipantType = z.infer<typeof ParticipantSchema>
