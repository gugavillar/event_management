import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { sendParticipantPicture } from '../usecases'

export const useSendParticipantPicture = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: sendPicture } = useMutation({
		mutationFn: sendParticipantPicture,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANTS] })
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA],
			})
		},
	})

	return {
		isPending,
		sendPicture,
	}
}
