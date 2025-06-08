import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createRoom } from '../usecases'

export const useCreateRoom = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
