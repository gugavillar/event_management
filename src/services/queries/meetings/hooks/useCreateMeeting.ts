import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { createMeeting } from '../usecases'

export const useCreateMeeting = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createMeeting,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEETINGS] })
		},
	})

	return {
		...mutation,
		create: mutation.mutateAsync,
	}
}
