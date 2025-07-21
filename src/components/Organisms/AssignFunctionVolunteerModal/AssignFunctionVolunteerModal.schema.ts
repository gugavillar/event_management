import { z } from 'zod'

import { validateFieldsForNotEquals } from '@/constants'

export const AssignFunctionSchema = z.object({
	eventId: z.uuid(),
	roles: z
		.array(
			z.object({
				roleId: z.string({ message: 'Campo obrigatório' }).uuid({
					message: 'Campo obrigatório',
				}),
				isLeader: z.boolean({ message: 'Campo obrigatório' }).optional(),
			}),
		)
		.check((ctx) =>
			validateFieldsForNotEquals(
				ctx.value,
				ctx,
				'roleId',
				'As funções devem ser diferentes',
			),
		),
})

export type AssignFunctionType = z.infer<typeof AssignFunctionSchema>
