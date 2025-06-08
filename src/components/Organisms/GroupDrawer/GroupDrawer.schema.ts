import { z } from 'zod'

import { MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const GroupSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	eventId: z
		.string({ required_error: 'Campo obrigatório' })
		.uuid({ message: 'Campo obrigatório' }),
	members: z
		.array(
			z.object({
				type: z
					.union([
						z.enum([MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER], {
							required_error: 'Campo obrigatório',
							message: 'Campo obrigatório',
						}),
						z.string(),
					])
					.refine(
						(value) =>
							[MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER].includes(
								value as MEMBERS,
							),
						{
							message: 'Campo obrigatório',
						},
					),
				member: z
					.string({ required_error: 'Campo obrigatório' })
					.uuid({ message: 'Campo obrigatório' }),
			}),
		)
		.superRefine((value, ctx) =>
			validateFieldsForNotEquals(
				value,
				ctx,
				'member',
				'Os membros devem ser diferentes',
			),
		),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
