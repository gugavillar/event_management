import { z } from 'zod'

import { ROLES } from '@/constants'

export const ChangeRoleUserSchema = z.object({
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

export type ChangeRoleUserType = z.infer<typeof ChangeRoleUserSchema>
