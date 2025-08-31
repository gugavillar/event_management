import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createParticipantPayment } from '../usecases'

export const useCreateParticipantPayment = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createParticipantPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_PAYMENTS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TRANSACTIONS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TRANSACTIONS_EXPORT_DATA],
			})
		},
	})

	return {
		isPending,
		create,
	}
}
