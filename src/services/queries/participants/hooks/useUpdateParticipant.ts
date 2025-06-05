import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateParticipant } from '../usecases'

export const useUpdateParticipant = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateParticipant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANT] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA],
			})
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
