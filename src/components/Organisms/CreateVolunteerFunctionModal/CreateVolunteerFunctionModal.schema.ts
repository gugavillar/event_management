import { z } from 'zod'

export const FunctionSchema = z.object({
	events: z.array(
		z.object({
			id: z.uuid(),
		})
	),
	role: z
		.string({ message: 'Campo obrigatório' })
		.trim()
		.min(1, { message: 'Campo obrigatório' }),
})

export type FunctionSchemaType = z.infer<typeof FunctionSchema>
