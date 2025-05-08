import { UUID } from 'crypto'

import { CHECK_IN_STATUS, PaymentTypeAPI } from '@/constants'

import { EventsAPI } from '../events/event.type'

export type ImportParticipantsDataValues = {
	file: File
	eventId: EventsAPI['id']
}

export type ParticipantsAPI = {
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
	checkIn: CHECK_IN_STATUS | null
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
	event: EventsAPI
}

export type ParticipantsFromAPI = {
	data: Array<ParticipantsAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
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

export type ParticipantsPaymentsAPI = {
	id: UUID
	paymentValue: string
	paymentType: PaymentTypeAPI | null
	eventId: UUID
	event: EventsAPI
	participantId: UUID
	participant: ParticipantsAPI
	createdAt: string
	updatedAt: string
}

export type ParticipantsPaymentsFromAPI = {
	data: Array<ParticipantsPaymentsAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
