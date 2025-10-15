import type { UUID } from 'crypto'

import type { MEMBERS } from '@/constants'

import type { EventsAPI } from '../events/event.type'
import type { ParticipantsAPI } from '../participants/participants.type'
import type { VolunteersAPI } from '../volunteers/volunteers.type'

export type FormRoom = {
	roomNumber: string
	eventId: string
	members: Array<{
		type: MEMBERS
		member: string
	}>
}

export type RoomMemberAPI = {
	id: UUID
	roomId: UUID
	type: MEMBERS
	participantId: string | null
	volunteerId: string | null
	participant: ParticipantsAPI | null
	volunteer: VolunteersAPI | null
}

export type RoomAPI = {
	id: UUID
	roomNumber: string
	createdAt: string
	updatedAt: string
	eventId: UUID
	event: EventsAPI
	members: Array<RoomMemberAPI>
}
