import { signOut } from 'next-auth/react'

import { useMutation } from '@/providers/QueryProvider'

import { updatePassword } from '../usecases'

export const useUpdatePassword = () => {
	const mutation = useMutation({
		mutationFn: updatePassword,
		onSuccess: async () => {
			await signOut({
				callbackUrl: '/',
				redirect: true,
			})
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
