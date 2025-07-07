import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateInterested } from '../usecases'

export const useUpdateInterested = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateInterested,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
