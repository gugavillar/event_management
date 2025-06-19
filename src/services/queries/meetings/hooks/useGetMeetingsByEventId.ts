'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { EventsAPI } from '../../events/event.type'
import { MeetingsFromAPI } from '../meetings.types'
import { getMeetingsByEventId } from '../usecases'

export const useGetMeetingsByEventId = () => {
	const [eventId, setEventId] = useState<EventsAPI['id'] | null>(null)

	const query: UseQueryResult<Array<MeetingsFromAPI>> = useQuery({
		queryKey: [QUERY_KEYS.MEETINGS, eventId],
		queryFn: () => getMeetingsByEventId(eventId as EventsAPI['id']),
		retry: 0,
		enabled: !!eventId,
	})

	return { ...query, eventId, setEventId }
}
