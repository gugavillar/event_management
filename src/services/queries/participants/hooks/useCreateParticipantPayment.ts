import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createParticipantPayment } from '../usecases'

export const useCreateParticipantPayment = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createParticipantPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_PAYMENTS],
			})
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
