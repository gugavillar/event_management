import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { blockOrUnblockUser } from '../usecases'

export const useBlockOrUnblockUser = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: blockOrUnblockUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
