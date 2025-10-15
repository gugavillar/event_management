import { z } from 'zod'

export const LoginButtonSchema = z.object({
	email: z
		.email({
			message: 'Email inválido',
		})
		.min(1, 'Campo obrigatório'),
	password: z
		.string({ error: 'Campo obrigatório' })
		.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
		.refine((value) => value.length >= 6, {
			message: 'Password deve ter no mínimo 6 caracteres',
		}),
})

export type LoginButtonSchemaType = z.infer<typeof LoginButtonSchema>

export const DefineNewPasswordSchema = z
	.object({
		confirmPassword: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine((value) => value.length >= 6, {
				message: 'Password deve ter no mínimo 6 caracteres',
			}),
		password: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine((value) => value.length >= 6, {
				message: 'Password deve ter no mínimo 6 caracteres',
			}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Senhas diferentes',
				path: ['confirmPassword'],
			})
		}
	})

export type DefineNewPasswordSchemaType = z.infer<typeof DefineNewPasswordSchema>
