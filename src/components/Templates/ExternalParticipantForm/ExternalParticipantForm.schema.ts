import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate, validateDateRange } from '@/formatters'

export const ExternalParticipantFormSchemaStepOne = (
	minAge?: number | null,
	maxAge?: number | null,
) =>
	z
		.object({
			name: z.string().trim().min(3, 'Campo obrigatório'),
			email: z
				.email({ error: 'Email inválido' })
				.trim()
				.refine((value) => validateEmail(value), { error: 'Email inválido' }),
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
					{ error: 'Data inválida' },
				)
				.refine(
					(value) =>
						/^\d{2}\/\d{2}\/\d{4}/g.test(value)
							? validateDateRange(value, minAge, maxAge)
							: false,
					{
						error: maxAge
							? `Idade tem que ser entre ${minAge} e ${maxAge} anos`
							: `Idade tem que ser maior ou igual a ${minAge} anos`,
					},
				),
			phone: z
				.string({ error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
					{ error: 'Telefone inválido' },
				),
			responsible: z.string().trim().min(3, 'Campo obrigatório'),
			responsiblePhone: z
				.string({ error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
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
			religion: z.string().optional(),
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
			health: z.string().optional(),
			host: z.string().trim().min(3, 'Campo obrigatório'),
			hostPhone: z
				.string({ error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
					{ error: 'Telefone inválido' },
				),
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

export const ExternalParticipantFormSchemaStepTwo = () =>
	z.object({
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

export const ExternalParticipantFormSchemaStepThree = () =>
	z.object({
		paymentMethod: z
			.union([
				z.enum(['PIX', 'Cash/Card'], {
					error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['PIX', 'Cash/Card'].includes(value), {
				error: 'Campo obrigatório',
			}),
	})

export const fullSchema = (minAge?: number | null, maxAge?: number | null) =>
	z.object({
		...ExternalParticipantFormSchemaStepOne(minAge, maxAge).shape,
		...ExternalParticipantFormSchemaStepTwo().shape,
		...ExternalParticipantFormSchemaStepThree().shape,
	})

export type FullSchemaType = z.infer<ReturnType<typeof fullSchema>>

export const stepsFields = (minAge?: number | null, maxAge?: number | null) =>
	[
		{
			schema: ExternalParticipantFormSchemaStepOne(minAge, maxAge),
			fields: [
				'name',
				'email',
				'called',
				'birthdate',
				'phone',
				'responsible',
				'responsiblePhone',
				'hasReligion',
				'religion',
				'hasHealth',
				'health',
				'host',
				'hostPhone',
			],
		},
		{
			schema: ExternalParticipantFormSchemaStepTwo(),
			fields: [
				'address.street',
				'address.neighborhood',
				'address.number',
				'address.city',
				'address.state',
			],
		},
		{
			schema: ExternalParticipantFormSchemaStepThree(),
			fields: ['paymentMethod'],
		},
	] as const
