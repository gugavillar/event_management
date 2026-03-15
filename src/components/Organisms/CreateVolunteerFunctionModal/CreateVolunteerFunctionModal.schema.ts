import { z } from 'zod'

import { MAX_FIELD_LENGTH } from '@/constants'

export const FunctionSchema = z.object({
	events: z.array(
		z.object({
			id: z.uuid(),
		})
	),
	role: z
		.string({ message: 'Campo obrigatório' })
		.trim()
		.min(1, { message: 'Campo obrigatório' })
		.max(MAX_FIELD_LENGTH, { error: `Tamanho máximo de ${MAX_FIELD_LENGTH} caracteres` }),
})

export type FunctionSchemaType = z.infer<typeof FunctionSchema>
