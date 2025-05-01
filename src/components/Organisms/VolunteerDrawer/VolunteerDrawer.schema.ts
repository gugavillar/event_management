import { validateEmail, validatePhone, validateUF } from 'validations-br'
import { z } from 'zod'

import { validateBirthdate } from '@/formatters'

export const VolunteerSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
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
		.string()
		.refine((value) =>
			/^\d{2}\/\d{2}\/\d{4}/g.test(value) ? validateBirthdate(value) : false,
		),
	contact: z
		.string()
		.refine((value) =>
			!value || value.length < 15 ? false : validatePhone(value),
		),
	maritalStatus: z.string().trim().min(1, 'Campo obrigatório'),
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
	parent: z.string().trim().min(1, 'Campo obrigatório'),
	contactParent: z
		.string()
		.refine((value) =>
			!value || value.length < 15 ? false : validatePhone(value),
		),
	relationship: z.string().trim().min(1, 'Campo obrigatório'),
})

export type VolunteerType = z.infer<typeof VolunteerSchema>
