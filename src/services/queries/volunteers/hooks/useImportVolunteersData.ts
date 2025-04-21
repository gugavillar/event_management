import { QUERY_KEYS } from '@/constants'
import { useMutation, useQueryClient } from '@/providers/QueryProvider'

import { importVolunteersData } from '../usecases'

export const useImportVolunteersData = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: importVolunteersData,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.VOLUNTEERS],
			})
		},
	})

	return {
		...mutation,
		importData: mutation.mutateAsync,
	}
}
