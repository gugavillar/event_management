import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createDonation } from '../usecases'

export const useCreateDonation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createDonation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DONATIONS] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
