'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { QUERY_KEYS } from '@/constants'
import { useQuery } from '@/providers/QueryProvider'

import {
	FormMeetingPresence,
	MeetingAPI,
	MeetingsFromAPI,
	PresencesFromApi,
} from '../meetings.types'
import { getMeeting, getMeetingPresenceById } from '../usecases'

export const useGetMeeting = () => {
	const [meetingId, setMeetingId] = useState('')

	const query: UseQueryResult<{
		meeting: MeetingAPI
		presenceResponse: Omit<FormMeetingPresence, 'meetingId'>
	}> = useQuery({
		queryKey: [QUERY_KEYS.MEETING, meetingId],
		queryFn: async () => {
			const presences: Array<PresencesFromApi> = await getMeetingPresenceById(
				meetingId as MeetingsFromAPI['id'],
			)
			const presenceResponse = {
				justification: presences?.map((presence) => ({
					[presence.volunteerId]: presence.justification,
				})),
				presence: presences?.map((presence) => ({
					[presence.volunteerId]: presence.presence,
				})),
			}
			const meeting = await getMeeting(meetingId as MeetingsFromAPI['id'])
			return {
				meeting,
				presenceResponse,
			}
		},
		retry: 0,
		enabled: !!meetingId,
	})

	return { ...query, meetingId, setMeetingId }
}
