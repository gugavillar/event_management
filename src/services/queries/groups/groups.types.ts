import type { UUID } from 'crypto'

import type { MEMBERS } from '@/constants'
import type { EventsAPI } from '../events/event.type'
import type { ParticipantsAPI } from '../participants/participants.type'
import type { VolunteersAPI } from '../volunteers/volunteers.type'

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
