import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ExternalVolunteerFormSchemaStepOne = z
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
			),
		phone: z
			.string({ required_error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ message: 'Telefone inválido' },
			),
		community: z.string().trim().min(1, 'Campo obrigatório'),
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
		cell: z.string().optional(),
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

export const ExternalVolunteerFormSchemaStepTwo = z.object({
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

export const ExternalVolunteerFormSchemaStepThree = z.object({
	paymentMethod: z.enum(['PIX', 'Cash/Card'], {
		required_error: 'Campo obrigatório',
	}),
})

export type ExternalVolunteerFormType = z.infer<
	typeof ExternalVolunteerFormSchemaStepOne &
		typeof ExternalVolunteerFormSchemaStepTwo &
		typeof ExternalVolunteerFormSchemaStepThree
>

export const stepsFields = [
	{
		schema: ExternalVolunteerFormSchemaStepOne,
		fields: [
			'name',
			'email',
			'called',
			'birthdate',
			'phone',
			'relative',
			'relativePhone',
			'hasCell',
			'cell',
			'hasHealth',
			'health',
			'community',
		],
	},
	{
		schema: ExternalVolunteerFormSchemaStepTwo,
		fields: [
			'address.street',
			'address.neighborhood',
			'address.number',
			'address.city',
			'address.state',
		],
	},
	{
		schema: ExternalVolunteerFormSchemaStepThree,
		fields: ['paymentMethod'],
	},
] as const
