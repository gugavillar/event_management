'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { getParticipantsCities } from '../usecases'

export const useGetParticipantsCities = ({
	isInterested,
	eventId,
}: {
	isInterested?: boolean
	eventId?: string
}) => {
	const { data } = useQuery({
		queryFn: () => getParticipantsCities(isInterested, eventId),
		queryKey: [QUERY_KEYS.PARTICIPANTS_CITIES, isInterested, eventId],
	})

	return { data }
}
