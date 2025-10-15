import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { blockOrUnblockUser } from '../usecases'

export const useBlockOrUnblockUser = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: blockOrUnblockUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
		},
	})

	return {
		isPending,
		update,
	}
}
