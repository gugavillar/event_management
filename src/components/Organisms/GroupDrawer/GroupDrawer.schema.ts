import { z } from 'zod'

import { MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const GroupSchema = z.object({
	name: z
		.string({ error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	eventId: z
		.string({ error: 'Campo obrigatório' })
		.uuid({ message: 'Campo obrigatório' }),
	members: z
		.array(
			z.object({
				type: z
					.union([
						z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER], {
							error: 'Campo obrigatório',
						}),
						z.string(),
					])
					.refine(
						(value) =>
							[MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER].includes(
								value as MEMBERS,
							),
						{
							error: 'Campo obrigatório',
						},
					),
				member: z.uuid({ message: 'Campo obrigatório' }),
			}),
		)
		.superRefine((data, ctx) =>
			validateFieldsForNotEquals(
				data,
				ctx,
				'member',
				'Os membros devem ser diferentes',
			),
		),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
