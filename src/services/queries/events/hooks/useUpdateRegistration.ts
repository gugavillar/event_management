import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'
import { updateRegistration } from '../usecases'

export const useUpdateRegistration = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: update } = useMutation({
		mutationFn: updateRegistration,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENT] })
		},
	})

	return {
		update,
	}
}
