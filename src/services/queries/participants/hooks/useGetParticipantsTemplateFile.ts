'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsTemplateFile } from '../usecases/getParticipantsTemplateFile'

export const useGetParticipantsTemplateFile = (enabled = false) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS_TEMPLATE_FILE],
		queryFn: getParticipantsTemplateFile,
		retry: 0,
		enabled,
	})

	return { ...query }
}
