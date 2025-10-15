import { PRINCIPAL_LINKS } from '@/constants'
import { useMutation } from '@/providers/QueryProvider'
import { signOut } from 'next-auth/react'
import { updatePassword } from '../usecases'

export const useUpdatePassword = () => {
	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			setTimeout(async () => {
				await signOut({
					callbackUrl: PRINCIPAL_LINKS.LOGIN,
					redirect: true,
				})
			}, 2000)
		},
	})

	return {
		isPending,
		update,
	}
}
