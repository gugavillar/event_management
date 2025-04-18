import { UUID } from 'crypto'

import { EventsFromAPI } from '../events/event.type'

export type ImportParticipantsDataValues = {
	file: File
	eventId: string
}

export type ParticipantsFromAPI = {
	id: UUID
	name: string
	email: string
	called: string
	birthdate: string
	contact: string
	maritalStatus: string
	parent: string
	contactParent: string
	relationship: string
	host: string
	contactHost: string
	createdAt: string
	updatedAt: string
	eventId: UUID
	Address: Array<{
		city: string
		createdAt: string
		id: UUID
		neighborhood: string
		number: string
		participantId: UUID
		state: string
		street: string
		updatedAt: string
	}>
	event: EventsFromAPI
}
