import { z } from 'zod'

import { validateFieldsForNotEquals } from '@/constants'

export const GroupSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	event: z
		.string({ required_error: 'Campo obrigatório' })
		.uuid({ message: 'Campo obrigatório' }),
	leader: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	participants: z
		.array(
			z.object({
				selected: z
					.string({ required_error: 'Campo obrigatório' })
					.refine((value) => !!value?.length, { message: 'Campo obrigatório' }),
			}),
		)
		.superRefine((value, ctx) => {
			if (value.length < 3) {
				value.forEach((_, index) => {
					ctx.addIssue({
						code: 'custom',
						path: [`${index}.selected`],
						message: 'O grupo deve ter pelo menos 3 participantes',
					})
				})
			}
		})
		.superRefine((value, ctx) =>
			validateFieldsForNotEquals(
				value,
				ctx,
				'selected',
				'Os participantes devem ser diferentes',
			),
		),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
