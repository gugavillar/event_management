import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteVolunteer } from '../usecases'

export const useDeleteVolunteer = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteVolunteer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEERS] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_INFINITY],
			})
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
