import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createDonation } from '../usecases'

export const useCreateDonation = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createDonation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DONATIONS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TRANSACTIONS_EXPORT_DATA],
			})
		},
	})

	return {
		create,
		isPending,
	}
}
