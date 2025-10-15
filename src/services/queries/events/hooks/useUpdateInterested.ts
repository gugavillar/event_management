import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'
import { updateInterested } from '../usecases'

export const useUpdateInterested = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: update } = useMutation({
		mutationFn: updateInterested,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT] })
		},
	})

	return {
		update,
	}
}
