import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { sendParticipantPicture } from '../usecases'

export const useSendParticipantPicture = () => {
	const queryClient = useQueryClient()

	const { isPending, mutateAsync: sendPicture } = useMutation({
		mutationFn: sendParticipantPicture,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PARTICIPANT] })
		},
	})

	return {
		isPending,
		sendPicture,
	}
}
