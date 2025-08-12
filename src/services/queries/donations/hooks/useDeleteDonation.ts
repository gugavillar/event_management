import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteDonation } from '../usecases'

export const useDeleteDonation = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: remove } = useMutation({
		mutationFn: deleteDonation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DONATIONS] })
		},
	})

	return {
		isPending,
		remove,
	}
}
