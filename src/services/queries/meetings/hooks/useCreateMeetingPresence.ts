import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createMeetingPresence } from '../usecases'

export const useCreateMeetingPresence = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createMeetingPresence,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MEETING],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MEETINGS_EXPORT_DATA],
			})
		},
	})

	return {
		isPending,
		create,
	}
}
