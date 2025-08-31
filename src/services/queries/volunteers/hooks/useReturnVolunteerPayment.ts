import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { returnVolunteerPayment } from '../usecases'

export const useReturnVolunteerPayment = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: returnPayment } = useMutation({
		mutationFn: returnVolunteerPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_PAYMENTS],
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
		returnPayment,
	}
}
