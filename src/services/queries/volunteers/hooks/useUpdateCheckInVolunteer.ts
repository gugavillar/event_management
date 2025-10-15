import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { updateCheckInVolunteer } from '../usecases'

export const useUpdateCheckInVolunteer = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: update } = useMutation({
		mutationFn: updateCheckInVolunteer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEERS] })
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VOLUNTEER] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_INFINITY],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS_FUNCTIONS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.ROOMS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GROUPS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MEETING],
			})
		},
	})

	return {
		isPending,
		update,
	}
}
