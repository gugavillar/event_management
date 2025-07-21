import { z } from 'zod'

export const FunctionSchema = z.object({
	role: z
		.string({ message: 'Campo obrigatório' })
		.trim()
		.min(1, { message: 'Campo obrigatório' }),
	events: z.array(
		z.object({
			id: z.uuid(),
		}),
	),
})

export type FunctionSchemaType = z.infer<typeof FunctionSchema>
