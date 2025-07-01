import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateCheckInParticipant } from '../usecases'

export const useUpdateCheckInParticipant = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateCheckInParticipant,
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
		...mutation,
		update: mutation.mutateAsync,
	}
}
