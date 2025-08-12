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

	const {
		data,
		isLoading,
	}: UseQueryResult<{
		meeting: MeetingAPI
		presenceResponse: Omit<FormMeetingPresence, 'meetingId'>
	}> = useQuery({
		queryKey: [QUERY_KEYS.MEETING, meetingId],
		queryFn: async () => {
			const meeting = await getMeeting(meetingId as MeetingsFromAPI['id'])
			const presences: Array<PresencesFromApi> = await getMeetingPresenceById(
				meetingId as MeetingsFromAPI['id'],
			)

			if (!presences.length) {
				return {
					meeting,
					presenceResponse: {
						presence: [],
						justification: [],
					},
				}
			}

			const presenceResponse = {
				justification: meeting.volunteers.map(
					(volunteer: MeetingAPI['volunteers'][number]) => ({
						[volunteer.id]:
							presences.find((p) => p.volunteerId === volunteer.id)
								?.justification ?? false,
					}),
				),
				presence: meeting.volunteers.map(
					(volunteer: MeetingAPI['volunteers'][number]) => ({
						[volunteer.id]:
							presences.find((p) => p.volunteerId === volunteer.id)?.presence ??
							false,
					}),
				),
			}
			return {
				meeting,
				presenceResponse,
			}
		},
		enabled: !!meetingId,
	})

	return { data, isLoading, meetingId, setMeetingId }
}
