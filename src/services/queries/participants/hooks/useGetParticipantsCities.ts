'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsCities } from '../usecases'

export const useGetParticipantsCities = (isInterested?: boolean) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS_CITIES, isInterested],
		queryFn: () => getParticipantsCities(isInterested),
		retry: 0,
	})

	return { ...query }
}
