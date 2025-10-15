import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createMeeting } from '../usecases'

export const useCreateMeeting = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: create } = useMutation({
		mutationFn: createMeeting,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEETINGS] })
		},
	})

	return {
		create,
		isPending,
	}
}
