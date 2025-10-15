import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ParticipantSchema = z
	.object({
		address: z.object({
			city: z.string().trim().min(3, 'Campo obrigatório'),
			neighborhood: z.string().trim().min(3, 'Campo obrigatório'),
			number: z.string().trim().min(1, 'Campo obrigatório'),
			state: z
				.string({ error: 'Campo obrigatório' })
				.max(2)
				.refine((value) => validateUF(value), {
					error: 'Campo obrigatório',
				}),
			street: z.string().trim().min(3, 'Campo obrigatório'),
		}),
		birthdate: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine((value) => (/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? validateBirthdate(value) : false), {
				message: 'Data inválida',
			}),
		called: z.string({ error: 'Campo obrigatório' }).trim().min(1, 'Campo obrigatório'),
		email: z
			.email({ message: 'Email inválido' })
			.trim()
			.refine((value) => validateEmail(value), { message: 'Email inválido' }),
		eventId: z.string().trim().min(1, 'Campo obrigatório'),
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
		health: z.string().nullable().optional(),
		host: z.string().trim().min(3, 'Campo obrigatório'),
		hostPhone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine((value) => (!value || value.length < 15 ? false : validatePhone(value)), { error: 'Telefone inválido' }),
		name: z.string().trim().min(3, 'Campo obrigatório'),
		phone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine((value) => (!value || value.length < 15 ? false : validatePhone(value)), { error: 'Telefone inválido' }),
		religion: z.string().nullable().optional(),
		responsible: z.string().trim().min(3, 'Campo obrigatório'),
		responsiblePhone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine((value) => (!value || value.length < 15 ? false : validatePhone(value)), { error: 'Telefone inválido' }),
	})
	.superRefine((data, ctx) => {
		if (data.hasReligion === 'Yes' && !data.religion?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['religion'],
			})
		}
		if (data.hasHealth === 'Yes' && !data.health?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['health'],
			})
		}
		validatePhonesNotEquals(
			data.phone,
			[
				{ field: 'responsiblePhone', phone: data.responsiblePhone },
				{ field: 'hostPhone', phone: data.hostPhone },
			],
			ctx
		)
	})

export type ParticipantType = z.infer<typeof ParticipantSchema>
