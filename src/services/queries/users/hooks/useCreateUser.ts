import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createUser } from '../usecases'

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
