import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createGroup } from '../usecases'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createGroup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUPS] })
		},
	})

	return {
		create,
		isPending,
	}
}
