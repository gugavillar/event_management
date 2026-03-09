'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsCities } from '../usecases'

export const useGetParticipantsCities = ({
	isInterested,
	eventId,
	enabled = true,
}: {
	isInterested?: boolean
	eventId?: string
	enabled?: boolean
}) => {
	const { data } = useQuery({
		enabled,
		queryFn: () => getParticipantsCities(isInterested, eventId),
		queryKey: [QUERY_KEYS.PARTICIPANTS_CITIES, isInterested, eventId],
	})

	return { data }
}
