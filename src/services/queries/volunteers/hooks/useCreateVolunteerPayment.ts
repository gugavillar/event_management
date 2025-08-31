import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createVolunteerPayment } from '../usecases'

export const useCreateVolunteerPayment = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createVolunteerPayment,
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
		create,
	}
}
