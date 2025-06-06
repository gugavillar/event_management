import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateVolunteerPayment } from '../usecases'

export const useUpdateVolunteerPayment = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateVolunteerPayment,
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
