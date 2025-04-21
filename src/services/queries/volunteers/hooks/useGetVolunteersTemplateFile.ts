'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteersTemplateFile } from '../usecases'

export const useGetVolunteersTemplateFile = (enabled = false) => {
	const query: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_TEMPLATE_FILE],
		queryFn: getVolunteersTemplateFile,
		retry: 0,
		enabled,
	})

	return { ...query }
}
