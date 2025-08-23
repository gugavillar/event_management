import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createTransaction } from '../usecases'

export const useCreateTransaction = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
		},
	})

	return {
		isPending,
		create,
	}
}
