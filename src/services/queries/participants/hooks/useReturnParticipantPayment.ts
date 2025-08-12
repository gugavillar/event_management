import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { returnParticipantPayment } from '../usecases'

export const useReturnParticipantPayment = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: returnPayment } = useMutation({
		mutationFn: returnParticipantPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_PAYMENTS],
			})
		},
	})

	return {
		isPending,
		returnPayment,
	}
}
