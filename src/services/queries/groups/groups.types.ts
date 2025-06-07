import { UUID } from 'crypto'

import { MEMBERS } from '@/constants'

import { EventsAPI } from '../events/event.type'
import { ParticipantsAPI } from '../participants/participants.type'
import { VolunteersAPI } from '../volunteers/volunteers.type'

export type FormGroup = {
	name: string
	eventId: string
	members: Array<{
		type: MEMBERS
		member: string
	}>
}

export type GroupMemberAPI = {
	id: UUID
	groupId: UUID
	type: MEMBERS
	participantId: string | null
	volunteerId: string | null
	participant: ParticipantsAPI | null
	volunteer: VolunteersAPI | null
}

export type GroupAPI = {
	id: UUID
	name: string
	createdAt: string
	updatedAt: string
	eventId: UUID
	event: EventsAPI
	members: Array<GroupMemberAPI>
}
