import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteRoom } from '../usecases'

export const useDeleteRoom = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: remove } = useMutation({
		mutationFn: deleteRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] })
		},
	})

	return {
		isPending,
		remove,
	}
}
