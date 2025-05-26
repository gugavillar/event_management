import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateUserRole } from '../usecases'

export const useUpdateUserRole = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateUserRole,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
