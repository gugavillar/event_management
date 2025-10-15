import { z } from 'zod'

import { MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const RoomSchema = z.object({
	eventId: z.uuid({ message: 'Campo obrigatório' }),
	members: z
		.array(
			z.object({
				member: z.uuid({ message: 'Campo obrigatório' }),
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
								value as MEMBERS
							),
						{
							error: 'Campo obrigatório',
						}
					),
			})
		)
		.superRefine((data, ctx) =>
			validateFieldsForNotEquals(
				data,
				ctx,
				'member',
				'Os membros devem ser diferentes'
			)
		),
	roomNumber: z
		.string()
		.trim()
		.min(1, { message: 'Campo obrigatório' })
		.max(2, { message: 'Máximo 2 caracteres' }),
})

export type RoomSchemaType = z.infer<typeof RoomSchema>
