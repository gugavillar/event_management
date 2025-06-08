import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteRoom } from '../usecases'

export const useDeleteRoom = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] })
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
