'use client'

import { UseQueryResult } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getExportParticipantsData } from '../usecases'

export const useGetExportParticipantsData = (
	event_id: string,
	isInterested?: boolean,
) => {
	const query: UseQueryResult<BlobPart> = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS_EXPORT_DATA, event_id, isInterested],
		queryFn: () => getExportParticipantsData(event_id, isInterested),
		retry: 0,
		enabled: !!event_id,
		staleTime: 100,
	})

	return { ...query }
}
