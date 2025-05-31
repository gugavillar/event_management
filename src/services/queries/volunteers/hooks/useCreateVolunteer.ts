import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createVolunteer } from '../usecases'

export const useCreateVolunteer = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createVolunteer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEERS] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
