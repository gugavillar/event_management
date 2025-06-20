'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsCities } from '../usecases'

export const useGetParticipantsCities = () => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.PARTICIPANTS_CITIES],
		queryFn: getParticipantsCities,
		retry: 0,
	})

	return { ...query }
}
