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
		password: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine((value) => value.length >= 6, {
				message: 'Password deve ter no mínimo 6 caracteres',
			}),
		confirmPassword: z
			.string({ error: 'Campo obrigatório' })
			.refine((value) => !!value?.length, { message: 'Campo obrigatório' })
			.refine((value) => value.length >= 6, {
				message: 'Password deve ter no mínimo 6 caracteres',
			}),
	})
	.check((ctx) => {
		if (ctx.value.password !== ctx.value.confirmPassword) {
			ctx.issues.push({
				code: 'custom',
				input: ctx.value,
				message: 'Senhas diferentes',
			})
		}
	})

export type DefineNewPasswordSchemaType = z.infer<
	typeof DefineNewPasswordSchema
>
