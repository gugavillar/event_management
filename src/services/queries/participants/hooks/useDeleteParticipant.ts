import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteParticipant } from '../usecases'

export const useDeleteParticipant = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteParticipant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
