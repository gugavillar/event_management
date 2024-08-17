'use client'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { EventsFromAPI } from '../event.type'
import { getEvent } from '../usecases'

export const useGetEvent = (eventId: EventsFromAPI['id'] | null) => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.EVENTS, eventId],
		queryFn: () => getEvent(eventId as EventsFromAPI['id']),
		retry: 0,
		enabled: !!eventId,
	})

	return { ...query }
}
