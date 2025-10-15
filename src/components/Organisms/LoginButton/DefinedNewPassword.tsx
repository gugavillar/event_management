'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header } from '@/components/Atoms'
import { InputField } from '@/components/Molecules'
import { useUpdatePassword } from '@/services/queries/users'

import { DefineNewPasswordSchema, type DefineNewPasswordSchemaType } from './LoginButton.schema'

export const DefinedNewPassword = () => {
	const { isPending, update } = useUpdatePassword()
	const methods = useForm<DefineNewPasswordSchemaType>({
		defaultValues: {
			confirmPassword: '',
			password: '',
		},
		mode: 'onChange',
		resolver: zodResolver(DefineNewPasswordSchema),
	})

	const handleRedefinedPassword: SubmitHandler<DefineNewPasswordSchemaType> = async ({ password }) => {
		await update(
			{ password },
			{
				onError: () => toast.error('Erro ao redefinir senha'),
				onSuccess: () => {
					sessionStorage.removeItem('hasToDefineNewPassword')
					toast.success('Senha redefinida com sucesso! Efetue o login com a nova senha')
				},
			}
		)
	}

	return (
		<aside className="flex h-screen w-full flex-col items-center justify-center space-y-6 p-6 md:p-8 lg:p-12">
			<Header>Crie uma nova senha</Header>
			<FormProvider {...methods}>
				<form className="flex w-full flex-col gap-6" onSubmit={methods.handleSubmit(handleRedefinedPassword)}>
					<InputField fieldName="password" type="password">
						Senha
					</InputField>
					<InputField fieldName="confirmPassword" type="password">
						Confirmação de senha
					</InputField>
					<Button
						className="items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						disabled={!methods.formState.isValid}
						isLoading={isPending}
					>
						Redefinir
					</Button>
				</form>
			</FormProvider>
		</aside>
	)
}
