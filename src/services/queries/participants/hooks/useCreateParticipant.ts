import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createParticipant } from '../usecases'

export const useCreateParticipant = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createParticipant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_INFINITY],
			})
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
