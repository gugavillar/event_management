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
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
