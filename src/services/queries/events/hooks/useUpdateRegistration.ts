import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateRegistration } from '../usecases'

export const useUpdateRegistration = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateRegistration,
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
