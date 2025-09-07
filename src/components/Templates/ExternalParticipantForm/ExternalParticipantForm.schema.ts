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
				ctx,
			)
		})

export const ExternalParticipantFormSchemaStepTwo = () =>
	z.object({
		terms: z.boolean({ error: 'Campo obrigatório' }).refine((value) => value, {
			error: 'Campo obrigatório',
		}),
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

export const ExternalParticipantFormSchemaStepThree = (
	isInterestedList?: boolean,
) =>
	z.object({
		paymentMethod: isInterestedList
			? z.enum(['PIX', 'Cash/Card']).optional()
			: z.enum(['PIX', 'Cash/Card'], { error: 'Campo obrigatório' }),
	})

export const fullSchema = (
	minAge?: number | null,
	maxAge?: number | null,
	isInterestedList?: boolean,
) =>
	z.intersection(
		z.intersection(
			ExternalParticipantFormSchemaStepOne(minAge, maxAge),
			ExternalParticipantFormSchemaStepTwo(),
		),
		ExternalParticipantFormSchemaStepThree(isInterestedList),
	)

export type FullSchemaType = z.infer<ReturnType<typeof fullSchema>>

export const stepsFields = (
	minAge?: number | null,
	maxAge?: number | null,
	isInterestedList?: boolean,
) =>
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
				'terms',
				'address.street',
				'address.neighborhood',
				'address.number',
				'address.city',
				'address.state',
			],
		},
		{
			schema: ExternalParticipantFormSchemaStepThree(isInterestedList),
			fields: ['paymentMethod'],
		},
	] as const
