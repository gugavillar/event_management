import { signOut } from 'next-auth/react'

import { useMutation } from '@/providers/QueryProvider'

import { updatePassword } from '../usecases'

export const useUpdatePassword = () => {
	const mutation = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			setTimeout(async () => {
				await signOut({
					callbackUrl: '/',
					redirect: true,
				})
			}, 2000)
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
