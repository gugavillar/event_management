'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import { MeetingAPI, MeetingsFromAPI } from '../meetings.types'
import { getMeeting } from '../usecases'

export const useGetMeeting = () => {
	const [meetingId, setMeetingId] = useState('')

	const query: UseQueryResult<MeetingAPI> = useQuery({
		queryKey: [QUERY_KEYS.MEETING, meetingId],
		queryFn: () => getMeeting(meetingId as MeetingsFromAPI['id']),
		retry: 0,
		enabled: !!meetingId,
	})

	return { ...query, meetingId, setMeetingId }
}
