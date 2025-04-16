import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { importParticipantsData } from '../usecases'

export const useImportParticipantsData = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: importParticipantsData,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PARTICIPANTS_DATA],
			})
		},
	})

	return {
		...mutation,
		importData: mutation.mutateAsync,
	}
}
