'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { getVolunteersCities } from '../usecases'

export const useGetVolunteersCities = ({ eventId }: { eventId?: string }) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.VOLUNTEERS_CITIES, eventId],
		queryFn: () => getVolunteersCities(eventId),
	})

	return { ...query }
}
