import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteFunction } from '../usecases'

export const useDeleteFunction = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteFunction,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS],
			})
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
