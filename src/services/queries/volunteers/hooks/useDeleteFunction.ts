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
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEER],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA],
			})
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
