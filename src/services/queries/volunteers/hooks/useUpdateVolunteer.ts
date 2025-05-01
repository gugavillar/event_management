import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateVolunteer } from '../usecases'

export const useUpdateVolunteer = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: updateVolunteer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEERS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEER] })
		},
	})

	return {
		...mutation,
		update: mutation.mutateAsync,
	}
}
