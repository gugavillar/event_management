'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'
import { getVolunteersCities } from '../usecases'

export const useGetVolunteersCities = ({ eventId }: { eventId?: string }) => {
	const { data } = useQuery({
		queryFn: () => getVolunteersCities(eventId),
		queryKey: [QUERY_KEYS.VOLUNTEERS_CITIES, eventId],
	})

	return { data }
}
