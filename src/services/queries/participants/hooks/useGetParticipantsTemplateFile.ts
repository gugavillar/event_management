'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsTemplateFile } from '../usecases'

export const useGetParticipantsTemplateFile = (enabled = false) => {
	const query: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS_TEMPLATE_FILE],
		queryFn: getParticipantsTemplateFile,
		retry: 0,
		enabled,
	})

	return { ...query }
}
