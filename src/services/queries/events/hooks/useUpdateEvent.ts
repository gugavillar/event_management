import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateEvent } from '../usecases'

export const useUpdateEvent = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
