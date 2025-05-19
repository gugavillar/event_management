import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { resetPassword } from '../usecases'

export const useResetPassword = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
