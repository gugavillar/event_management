import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { deleteGroup } from '../usecases'

export const useDeleteGroup = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: deleteGroup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUPS] })
		},
	})

	return {
		...mutation,
		remove: mutation.mutateAsync,
	}
}
