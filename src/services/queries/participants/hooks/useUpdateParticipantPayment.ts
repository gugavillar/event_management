import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateParticipantPayment } from '../usecases'

export const useUpdateParticipantPayment = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateParticipantPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_PAYMENT],
			})
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
