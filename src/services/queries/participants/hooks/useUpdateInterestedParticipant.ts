import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateInterestedParticipant } from '../usecases'

export const useUpdateInterestedParticipant = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updateInterestedParticipant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANT] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_INFINITY],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA],
			})
		},
	})

	return {
		isPending,
		update,
	}
}
