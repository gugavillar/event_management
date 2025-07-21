import { validateEmail } from 'validations-br'
import { z } from 'zod'

import { ROLES } from '@/constants'

export const UserSchema = z.object({
	name: z
		.string({ error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	email: z
		.email({ error: 'Campo obrigatório' })
		.trim()
		.refine((value) => validateEmail(value), { message: 'Email inválido' }),
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
