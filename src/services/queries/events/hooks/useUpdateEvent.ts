import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateEvent } from '../usecases'

export const useUpdateEvent = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updateEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS_INFINITY] })
		},
	})

	return {
		isPending,
		update,
	}
}
