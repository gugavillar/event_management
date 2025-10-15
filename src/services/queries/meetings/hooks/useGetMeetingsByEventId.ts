'use client'
import type { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import type { EventsAPI } from '../../events/event.type'
import type { MeetingsFromAPI } from '../meetings.types'
import { getMeetingsByEventId } from '../usecases'

export const useGetMeetingsByEventId = () => {
	const [eventId, setEventId] = useState<EventsAPI['id'] | null>(null)

	const { data }: UseQueryResult<Array<MeetingsFromAPI>> = useQuery({
		enabled: !!eventId,
		queryFn: () => getMeetingsByEventId(eventId as EventsAPI['id']),
		queryKey: [QUERY_KEYS.MEETINGS, eventId],
	})

	return { data, eventId, setEventId }
}
