'use client'

import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { getExportMeetingPresence } from '../usecases'

export const useGetExportMeetingPresence = (event_id: string) => {
	const { isError, isFetching, data }: UseQueryResult<BlobPart> = useQuery({
		enabled: !!event_id,
		queryFn: () => getExportMeetingPresence(event_id),
		queryKey: [QUERY_KEYS.MEETINGS_EXPORT_DATA, event_id],
		staleTime: 100,
	})

	return { data, isError, isFetching }
}
