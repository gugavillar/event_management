import { UUID } from 'crypto'

import { CHECK_IN_STATUS, PaymentTypeAPI } from '@/constants'

import { EventsFromAPI } from '../events/event.type'

export type ImportParticipantsDataValues = {
	file: File
	eventId: EventsFromAPI['id']
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
	checkIn: (typeof CHECK_IN_STATUS)[keyof typeof CHECK_IN_STATUS] | null
	createdAt: string
	updatedAt: string
	eventId: UUID
	Address: {
		id: UUID
		street: string
		neighborhood: string
		number: string
		city: string
		state: string
		createdAt: string
		updatedAt: string
		volunteerId: UUID
	}
	event: EventsFromAPI
}

export type FormParticipant = {
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
	city: string
	neighborhood: string
	number: string
	state: string
	street: string
}

export type ParticipantsPaymentsFromAPI = {
	id: UUID
	paymentValue: string
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null
	eventId: UUID
	event: EventsFromAPI
	participantId: UUID
	participant: ParticipantsFromAPI
	createdAt: string
	updatedAt: string
}
