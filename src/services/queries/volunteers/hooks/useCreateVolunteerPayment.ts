import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createVolunteerPayment } from '../usecases'

export const useCreateVolunteerPayment = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createVolunteerPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_PAYMENTS],
			})
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
