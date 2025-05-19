'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { Button, Header } from '@/components/Atoms'
import { InputField } from '@/components/Molecules'
import { useLogin } from '@/services/queries/auth'

import { LoginButtonSchema, LoginButtonSchemaType } from './LoginButton.schema'

export const LoginButton = () => {
	const methods = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(LoginButtonSchema),
		mode: 'onChange',
	})
	const { login, isPending } = useLogin()

	const handleSubmitLogin: SubmitHandler<LoginButtonSchemaType> = async (
		values,
	) => {
		await login({
			email: values.email,
			password: values.password,
		})
	}

	return (
		<aside className="flex h-screen w-full flex-col items-center justify-center space-y-6 p-6 md:p-8 lg:p-12">
			<Header>Acesse sua conta</Header>
			<FormProvider {...methods}>
				<form
					className="flex w-full flex-col gap-6"
					onSubmit={methods.handleSubmit(handleSubmitLogin)}
				>
					<InputField fieldName="email">Email</InputField>
					<InputField fieldName="password" type="password">
						Senha
					</InputField>
					<Button
						className="items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						isLoading={isPending}
						disabled={!methods.formState.isValid}
					>
						Entrar
					</Button>
				</form>
			</FormProvider>
		</aside>
	)
}
