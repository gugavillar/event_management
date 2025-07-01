import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteEvent } from '../usecases'

export const useDeleteEvent = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS_INFINITY] })
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
