import { z } from 'zod'

import { MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const RoomSchema = z.object({
	roomNumber: z
		.string()
		.trim()
		.min(1, { message: 'Campo obrigatório' })
		.max(2, { message: 'Máximo 2 caracteres' }),
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

export type RoomSchemaType = z.infer<typeof RoomSchema>
