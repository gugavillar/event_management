'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportMeetingPresence } from '../usecases'

export const useGetExportMeetingPresence = (event_id: string) => {
	const query: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.MEETINGS_EXPORT_DATA, event_id],
		queryFn: () => getExportMeetingPresence(event_id),
		retry: 0,
		enabled: !!event_id,
		staleTime: 100,
	})

	return { ...query }
}
