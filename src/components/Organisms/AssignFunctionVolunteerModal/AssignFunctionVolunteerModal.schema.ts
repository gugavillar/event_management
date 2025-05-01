import { z } from 'zod'

export const AssignFunctionSchema = z.object({
	roleId: z.string({ message: 'Campo obrigatório' }).uuid(),
})

export type AssignFunctionType = z.infer<typeof AssignFunctionSchema>
