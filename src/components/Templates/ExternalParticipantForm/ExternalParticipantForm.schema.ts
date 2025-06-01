import { differenceInYears } from 'date-fns'
import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ExternalParticipantFormSchemaStepOne = z
	.object({
		name: z.string().trim().min(1, 'Campo obrigatório'),
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
				(value) => {
					if (/^\d{2}\/\d{2}\/\d{4}/g.test(value)) {
						const age = differenceInYears(new Date(), new Date(value))
						return age >= 14 && age <= 19
					}
					return false
				},
				{ message: 'Idade tem que ser entre 14 e 19 anos' },
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
		host: z.string().trim().min(1, 'Campo obrigatório'),
		hostPhone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
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
			[
				{ field: 'phone', phone: value.phone },
				{ field: 'responsiblePhone', phone: value.responsiblePhone },
				{ field: 'hostPhone', phone: value.hostPhone },
			],
			ctx,
		)
	})

export const ExternalParticipantFormSchemaStepTwo = z.object({
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

export const ExternalParticipantFormSchemaStepThree = z.object({
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
	typeof ExternalParticipantFormSchemaStepOne &
		typeof ExternalParticipantFormSchemaStepTwo &
		typeof ExternalParticipantFormSchemaStepThree
>

export const stepsFields = [
	{
		schema: ExternalParticipantFormSchemaStepOne,
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
		schema: ExternalParticipantFormSchemaStepTwo,
		fields: [
			'address.street',
			'address.neighborhood',
			'address.number',
			'address.city',
			'address.state',
		],
	},
	{
		schema: ExternalParticipantFormSchemaStepThree,
		fields: ['paymentMethod'],
	},
] as const
