import { validateEmail } from 'validations-br'
import { z } from 'zod'

import { ROLES } from '@/constants'

export const UserSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	email: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.email({ message: 'Campo obrigatório' })
		.refine((value) => validateEmail(value), { message: 'Email inválido' }),
	role: z
		.union([
			z.enum([ROLES.ADMIN, ROLES.USER], {
				required_error: 'Campo obrigatório',
				message: 'Campo obrigatório',
			}),
			z.string(),
		])
		.refine((value) => [ROLES.ADMIN, ROLES.USER].includes(value as ROLES), {
			message: 'Campo obrigatório',
		}),
})

export type UserSchemaType = z.infer<typeof UserSchema>
