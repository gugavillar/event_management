'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import type { LoginButtonSchemaType } from '@/components/Organisms/LoginButton/LoginButton.schema'
import { PRINCIPAL_LINKS } from '@/constants'
import { convertToBoolean } from '@/formatters'
import { useMutation } from '@/providers/QueryProvider'
import { getSession, type SignInResponse, signIn } from 'next-auth/react'

export const useLogin = () => {
	const [hasToDefineNewPassword, setHasToDefineNewPassword] = useState(
		convertToBoolean('')
	)
	const { push } = useRouter()

	const { isPending, mutateAsync: login } = useMutation({
		mutationFn: async ({ email, password }: LoginButtonSchemaType) =>
			await signIn('credentials', {
				email,
				password,
				redirect: false,
			}),
		onError: () => {
			toast.error('Erro ao efetuar login')
		},
		onSuccess: async (data: SignInResponse | undefined) => {
			if (data?.error) {
				return toast.error(data?.error ?? 'Erro ao efetuar login')
			}
			await toast.promise(getSession(), {
				error: () => 'Falha ao realizar o login tente novamente',
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
			})
		},
	})

	return {
		hasToDefineNewPassword,
		isPending,
		login,
		setHasToDefineNewPassword,
	}
}
