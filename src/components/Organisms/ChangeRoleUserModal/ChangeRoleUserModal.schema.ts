import { z } from 'zod'

import { ROLES } from '@/constants'

export const ChangeRoleUserSchema = z.object({
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

export type ChangeRoleUserType = z.infer<typeof ChangeRoleUserSchema>
