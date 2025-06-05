import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateVolunteerFunction } from '../usecases'

export const useUpdateVolunteerFunction = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateVolunteerFunction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEERS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEER] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA],
			})
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
