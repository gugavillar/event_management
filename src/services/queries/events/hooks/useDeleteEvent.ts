import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteEvent } from '../usecases'

export const useDeleteEvent = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: remove } = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS_INFINITY] })
		},
	})

	return {
		isPending,
		remove,
	}
}
