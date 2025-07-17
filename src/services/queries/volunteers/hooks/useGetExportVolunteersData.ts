'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportVolunteerData } from '../usecases'

export const useGetExportVolunteerData = (event_id: string) => {
	const query: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_EXPORT_DATA, event_id],
		queryFn: () => getExportVolunteerData(event_id),
		enabled: !!event_id,
		staleTime: 100,
	})

	return { ...query }
}
