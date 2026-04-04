'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getParticipantsCities } from '../usecases'

export const useGetParticipantsCities = ({
	isInterested,
	eventId,
	isOnlyConfirmed,
	enabled = true,
}: {
	isInterested?: boolean
	eventId?: string
	isOnlyConfirmed?: boolean
	enabled?: boolean
}) => {
	const { data } = useQuery({
		enabled,
		queryFn: () => getParticipantsCities(isInterested, eventId, isOnlyConfirmed),
		queryKey: [QUERY_KEYS.PARTICIPANTS_CITIES, isInterested, eventId, isOnlyConfirmed],
	})

	return { data }
}
