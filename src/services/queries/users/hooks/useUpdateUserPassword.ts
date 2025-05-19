import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateUserPassword } from '../usecases'

export const useUpdateUserPassword = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateUserPassword,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
