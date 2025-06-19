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
