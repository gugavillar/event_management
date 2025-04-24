import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createFunction } from '../usecases'

export const useCreateFunction = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createFunction,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS],
			})
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
