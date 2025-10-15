import type { UUID } from 'crypto'

import type { CHECK_IN_STATUS, PaymentTypeAPI } from '@/constants'

import type { EventsAPI } from '../events/event.type'

export type ParticipantsAPI = {
	id: UUID
	name: string
	called: string
	email: string
	phone: string
	birthdate: string
	responsible: string
	responsiblePhone: string
	religion?: string
	health?: string
	host: string
	hostPhone: string
	checkIn: CHECK_IN_STATUS | null
	interested?: boolean
	createdAt: string
	updatedAt: string
	eventId: UUID
	address: {
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
	payments: Array<{
		id: UUID
		paymentValue: string
		paymentType: PaymentTypeAPI | null
		eventId: UUID
		event: EventsAPI
		participantId: UUID
		participant: ParticipantsAPI
		createdAt: string
		updatedAt: string
	}>
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
	called: string
	email: string
	phone: string
	birthdate: string
	responsible: string
	responsiblePhone: string
	religion?: string | null
	health?: string | null
	host: string
	hostPhone: string
	address: {
		street: string
		neighborhood: string
		number: string
		city: string
		state: string
	}
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
