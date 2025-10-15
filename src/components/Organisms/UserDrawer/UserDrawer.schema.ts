import { z } from 'zod'

import { ROLES } from '@/constants'
import { validateEmail } from 'validations-br'

export const UserSchema = z.object({
	email: z
		.email({ error: 'Campo obrigatório' })
		.trim()
		.refine((value) => validateEmail(value), { message: 'Email inválido' }),
	name: z
		.string({ error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	role: z
		.union([
			z.enum([ROLES.ADMIN, ROLES.USER], {
				error: 'Campo obrigatório',
			}),
			z.string(),
		])
		.refine((value) => [ROLES.ADMIN, ROLES.USER].includes(value as ROLES), {
			error: 'Campo obrigatório',
		}),
})

export type UserSchemaType = z.infer<typeof UserSchema>
