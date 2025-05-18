import { z } from 'zod'

export const LoginButtonSchema = z.object({
	email: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, 'Campo obrigatório')
		.email({
			message: 'Email inválido',
		}),
	password: z
		.string({ required_error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
		.refine((value) => value.length >= 6, {
			message: 'Password deve ter no mínimo 6 caracteres',
		}),
})

export type LoginButtonSchemaType = z.infer<typeof LoginButtonSchema>
