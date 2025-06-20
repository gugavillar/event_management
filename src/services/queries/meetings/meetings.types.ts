import { UUID } from 'crypto'

import { EventsAPI } from '../events/event.type'
import { VolunteersAPI } from '../volunteers/volunteers.type'

export type FormMeeting = {
	title: string
	eventId: string
	date: string
}

export type MeetingsFromAPI = {
	id: UUID
	title: string
	date: string
	eventId: EventsAPI['id']
}

export type MeetingAPI = {
	meeting: MeetingsFromAPI
	volunteers: Array<Pick<VolunteersAPI, 'id' | 'name'>>
}

export type FormMeetingPresence = {
	meetingId: string
	presence: Array<Record<string, boolean>>
	justification: Array<Record<string, boolean>>
}

export type PresencesFromApi = {
	checkedAt: string
	id: UUID
	justification: boolean
	meetingId: UUID
	presence: boolean
	volunteerId: UUID
}
