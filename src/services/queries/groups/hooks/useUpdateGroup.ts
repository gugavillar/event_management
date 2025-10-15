import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'
import { updateGroup } from '../usecases'

export const useUpdateGroup = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updateGroup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUPS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUP] })
		},
	})

	return {
		isPending,
		update,
	}
}
