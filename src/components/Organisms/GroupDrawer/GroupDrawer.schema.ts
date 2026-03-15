import { z } from 'zod'

import { MAX_FIELD_LENGTH, MEMBERS, validateFieldsForNotEquals } from '@/constants'

export const GroupSchema = z.object({
	eventId: z.string({ error: 'Campo obrigatório' }).uuid({ message: 'Campo obrigatório' }),
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
					.refine((value) => [MEMBERS.PARTICIPANT, MEMBERS.VOLUNTEER].includes(value as MEMBERS), {
						error: 'Campo obrigatório',
					}),
			})
		)
		.superRefine((data, ctx) => validateFieldsForNotEquals(data, ctx, 'member', 'Os membros devem ser diferentes')),
	name: z
		.string({ error: 'Campo obrigatório' })
		.trim()
		.min(3, 'Campo obrigatório')
		.max(MAX_FIELD_LENGTH, { error: `Tamanho máximo de ${MAX_FIELD_LENGTH} caracteres` }),
})

export type GroupSchemaType = z.infer<typeof GroupSchema>
