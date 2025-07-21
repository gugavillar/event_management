import { z } from 'zod'

import { MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const RoomSchema = z.object({
	roomNumber: z
		.string()
		.trim()
		.min(1, { message: 'Campo obrigatório' })
		.max(2, { message: 'Máximo 2 caracteres' }),
	eventId: z.uuid({ message: 'Campo obrigatório' }),
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
		.check((ctx) =>
			validateFieldsForNotEquals(
				ctx.value,
				ctx,
				'member',
				'Os membros devem ser diferentes',
			),
		),
})

export type RoomSchemaType = z.infer<typeof RoomSchema>
