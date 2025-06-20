import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createMeetingPresence } from '../usecases'

export const useCreateMeetingPresence = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createMeetingPresence,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MEETINGS_PRESENCE],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MEETINGS_EXPORT_DATA],
			})
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
