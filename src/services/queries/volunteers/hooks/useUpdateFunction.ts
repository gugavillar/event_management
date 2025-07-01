import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateFunction } from '../usecases'

export const useUpdateFunction = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateFunction,
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
		update: mutation.mutateAsync,
	}
}
