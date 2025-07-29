import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validatePhonesNotEquals } from '@/constants'
import { validateBirthdate } from '@/formatters'

export const ExternalVolunteerFormSchemaStepOne = z
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
			),
		phone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ error: 'Telefone inválido' },
			),
		community: z.string().trim().min(3, 'Campo obrigatório'),
		relative: z.string().trim().min(3, 'Campo obrigatório'),
		relativePhone: z
			.string({ error: 'Campo obrigatório' })
			.trim()
			.refine(
				(value) => (!value || value.length < 15 ? false : validatePhone(value)),
				{ error: 'Telefone inválido' },
			),
		hasCell: z
			.union([
				z.enum(['Yes', 'No'], {
					error: 'Campo obrigatório',
				}),
				z.string(),
			])
			.refine((value) => ['Yes', 'No'].includes(value), {
				error: 'Campo obrigatório',
			}),
		cell: z.string().optional(),
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
	})
	.check((ctx) => {
		if (ctx.value.hasCell === 'Yes' && !ctx.value.cell?.trim()) {
			ctx.issues.push({
				input: ctx.value,
				code: 'custom',
				message: 'Campo obrigatório',
				path: ['cell'],
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
			[{ field: 'relativePhone', phone: ctx.value.relativePhone }],
			ctx,
		)
	})

export const ExternalVolunteerFormSchemaStepTwo = z.object({
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

export const ExternalVolunteerFormSchemaStepThree = z.object({
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

export const fullSchema = z.object({
	...ExternalVolunteerFormSchemaStepOne.shape,
	...ExternalVolunteerFormSchemaStepTwo.shape,
	...ExternalVolunteerFormSchemaStepThree.shape,
})

export type FullSchemaType = z.infer<typeof fullSchema>

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
			'terms',
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
