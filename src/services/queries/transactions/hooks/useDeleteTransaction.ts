import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'
import { deleteTransaction } from '../usecases'

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: remove } = useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
		},
	})

	return {
		isPending,
		remove,
	}
}
