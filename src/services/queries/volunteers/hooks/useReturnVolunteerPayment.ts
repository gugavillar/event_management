import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { returnVolunteerPayment } from '../usecases'

export const useReturnVolunteerPayment = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: returnVolunteerPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_PAYMENTS],
			})
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
