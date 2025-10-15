import { z } from 'zod'

import { validateFieldsForNotEquals } from '@/constants'

export const AssignFunctionSchema = z.object({
	eventId: z.uuid(),
	roles: z
		.array(
			z.object({
				isLeader: z.boolean({ message: 'Campo obrigatório' }).optional(),
				roleId: z.string({ message: 'Campo obrigatório' }).uuid({
					message: 'Campo obrigatório',
				}),
			})
		)
		.superRefine((data, ctx) =>
			validateFieldsForNotEquals(
				data,
				ctx,
				'roleId',
				'As funções devem ser diferentes'
			)
		),
})

export type AssignFunctionType = z.infer<typeof AssignFunctionSchema>
