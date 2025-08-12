'use client'
import { useRouter } from 'next/navigation'
import { getSession, signIn, SignInResponse } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { LoginButtonSchemaType } from '@/components/Organisms/LoginButton/LoginButton.schema'
import { PRINCIPAL_LINKS } from '@/constants'
import { convertToBoolean } from '@/formatters'
import { useMutation } from '@/providers/QueryProvider'

export const useLogin = () => {
	const [hasToDefineNewPassword, setHasToDefineNewPassword] = useState(
		convertToBoolean(''),
	)
	const { push } = useRouter()

	const { isPending, mutateAsync: login } = useMutation({
		mutationFn: async ({ email, password }: LoginButtonSchemaType) =>
			await signIn('credentials', {
				email,
				password,
				redirect: false,
			}),
		onSuccess: async (data: SignInResponse | undefined) => {
			if (data?.error) {
				return toast.error(data?.error ?? 'Erro ao efetuar login')
			}
			await toast.promise(getSession(), {
				loading: 'Verificando credenciais...',
				success: (data) => {
					const userRole = data?.user?.role
					const isFirstAccess = data?.user?.firstAccess

					if (!userRole) throw new Error('Usuário sem permissão')

					if (isFirstAccess) {
						sessionStorage.setItem('hasToDefineNewPassword', 'true')
						setHasToDefineNewPassword(true)
						return 'Primeiro acesso, defina uma senha'
					}

					setTimeout(() => push(PRINCIPAL_LINKS.DASHBOARD), 1000)

					return 'Redirecionando para o dashboard'
				},
				error: () => 'Falha ao realizar o login tente novamente',
			})
		},
		onError: () => {
			toast.error('Erro ao efetuar login')
		},
	})

	return {
		isPending,
		hasToDefineNewPassword,
		setHasToDefineNewPassword,
		login,
	}
}
