'use client'

import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportVolunteerData } from '../usecases'

export const useGetExportVolunteerData = (event_id: string) => {
	const { data, isError, isFetching }: UseQueryResult<BlobPart> = useQuery({
		enabled: !!event_id,
		queryFn: () => getExportVolunteerData(event_id),
		queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA, event_id],
		staleTime: 100,
	})

	return { data, isError, isFetching }
}
