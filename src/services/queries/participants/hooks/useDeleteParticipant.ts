import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteParticipant } from '../usecases'

export const useDeleteParticipant = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteParticipant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_INFINITY],
			})
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
