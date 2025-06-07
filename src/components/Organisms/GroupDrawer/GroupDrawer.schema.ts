import { z } from 'zod'

import { MEMBERS } from '@/constants'

export const GroupSchema = z.object({
	name: z
		.string({ required_error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório'),
	eventId: z
		.string({ required_error: 'Campo obrigatório' })
		.uuid({ message: 'Campo obrigatório' }),
	members: z.array(
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
						[MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER].includes(value as MEMBERS),
					{
						message: 'Campo obrigatório',
					},
				),
			member: z
				.string({ required_error: 'Campo obrigatório' })
				.uuid({ message: 'Campo obrigatório' }),
		}),
	),
	// .superRefine((value, ctx) => {
	// 	if (value.length < 3) {
	// 		value.forEach((_, index) => {
	// 			ctx.addIssue({
	// 				code: 'custom',
	// 				path: [`${index}.member`],
	// 				message: 'O grupo deve ter pelo menos 3 participantes',
	// 			})
	// 		})
	// 	}
	// }),
	// .superRefine((value, ctx) =>
	// 	validateFieldsForNotEquals(
	// 		value,
	// 		ctx,
	// 		'member',
	// 		'Os participantes devem ser diferentes',
	// 	),
	// ),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
