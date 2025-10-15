'use client'

import type { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportParticipantsData } from '../usecases'

export const useGetExportParticipantsData = (event_id: string, isInterested?: boolean) => {
	const { isError, isFetching, data }: UseQueryResult<BlobPart> = useQuery({
		enabled: !!event_id,
		queryFn: () => getExportParticipantsData(event_id, isInterested),
		queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA, event_id, isInterested],
		staleTime: 100,
	})

	return { data, isError, isFetching }
}
