import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createEvent } from '../usecases'

export const useCreateEvent = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS_INFINITY] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
