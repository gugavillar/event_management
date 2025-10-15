import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'
import { updateRoom } from '../usecases'

export const useUpdateRoom = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updateRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM] })
		},
	})

	return {
		isPending,
		update,
	}
}
