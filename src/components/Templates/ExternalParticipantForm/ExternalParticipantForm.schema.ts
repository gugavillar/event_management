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
				.string({ required_error: 'Campo obrigatório' })
				.trim()
				.email({ message: 'Email inválido' })
				.refine((value) => validateEmail(value), { message: 'Email inválido' }),
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
				)
				.refine(
					(value) =>
						/^\d{2}\/\d{2}\/\d{4}/g.test(value)
							? validateDateRange(value, minAge, maxAge)
							: false,
					{
						message: maxAge
							? `Idade tem que ser entre ${minAge} e ${maxAge} anos`
							: `Idade tem que ser maior ou igual a ${minAge} anos`,
					},
				),
			phone: z
				.string({ required_error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
					{ message: 'Telefone inválido' },
				),
			responsible: z.string().trim().min(3, 'Campo obrigatório'),
			responsiblePhone: z
				.string({ required_error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
					{ message: 'Telefone inválido' },
				),
			hasReligion: z
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
			religion: z.string().optional(),
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
			health: z.string().optional(),
			host: z.string().trim().min(3, 'Campo obrigatório'),
			hostPhone: z
				.string({ required_error: 'Campo obrigatório' })
				.trim()
				.refine(
					(value) =>
						!value || value.length < 15 ? false : validatePhone(value),
					{ message: 'Telefone inválido' },
				),
		})
		.superRefine((value, ctx) => {
			if (value.hasReligion === 'Yes' && !value.religion?.trim()) {
				ctx.addIssue({
					code: 'custom',
					message: 'Campo obrigatório',
					path: ['religion'],
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
				[
					{ field: 'responsiblePhone', phone: value.responsiblePhone },
					{ field: 'hostPhone', phone: value.hostPhone },
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
				.string({ required_error: 'Campo obrigatório' })
				.max(2)
				.refine((value) => validateUF(value), {
					message: 'Campo obrigatório',
				}),
		}),
	})

export const ExternalParticipantFormSchemaStepThree = () =>
	z.object({
		paymentMethod: z
			.union([
				z.enum(['PIX', 'Cash/Card'], {
					required_error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['PIX', 'Cash/Card'].includes(value), {
				message: 'Campo obrigatório',
			}),
	})

export type ExternalParticipantFormType = z.infer<
	ReturnType<typeof ExternalParticipantFormSchemaStepOne> &
		ReturnType<typeof ExternalParticipantFormSchemaStepTwo> &
		ReturnType<typeof ExternalParticipantFormSchemaStepThree>
>

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
