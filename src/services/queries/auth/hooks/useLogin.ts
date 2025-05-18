import { useRouter } from 'next/navigation'
import { getSession, signIn, SignInResponse } from 'next-auth/react'
import toast from 'react-hot-toast'

import { LoginButtonSchemaType } from '@/components/Organisms/LoginButton/LoginButton.schema'
import { useMutation } from '@/providers/QueryProvider'

export const useLogin = () => {
	const { push } = useRouter()

	const query = useMutation({
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

					if (!userRole) throw new Error('Usuário sem permissão')

					setTimeout(() => push('/dashboard'), 1000)

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
		...query,
		login: query.mutateAsync,
	}
}
