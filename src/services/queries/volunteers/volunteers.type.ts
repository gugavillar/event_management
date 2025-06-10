import { UUID } from 'crypto'

import { CHECK_IN_STATUS, PaymentTypeAPI } from '@/constants'

import { EventsAPI } from '../events/event.type'

export type ImportVolunteersDataValues = {
	file: File
	eventId: EventsAPI['id']
}

type Volunteers = {
	id: UUID
	name: string
	email: string
	called: string
	birthdate: string
	phone: string
	relative: string
	relativePhone: string
	cell?: string
	health?: string
	community: string
	checkIn: CHECK_IN_STATUS | null
	createdAt: string
	updatedAt: string
	eventId: UUID
	event: EventsAPI
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
}

export type VolunteersFunctionsFromAPI = {
	id: UUID
	role: string
	leaderId: UUID
	leader: Volunteers
	volunteers: Array<Volunteers>
	createdAt: string
	updatedAt: string
}

export type VolunteersAPI = Volunteers & {
	volunteerRole: Array<VolunteersFunctionsFromAPI>
}

export type VolunteersFromAPI = {
	data: Array<VolunteersAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}

export type VolunteersFunctionsForm = {
	role: string
}

export type FormVolunteer = {
	name: string
	called: string
	email: string
	phone: string
	birthdate: string
	relative: string
	relativePhone: string
	cell?: string | null
	health?: string | null
	community: string
	address: {
		street: string
		neighborhood: string
		number: string
		city: string
		state: string
	}
}

export type VolunteersPaymentsAPI = {
	id: UUID
	paymentValue: string
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null
	eventId: UUID
	event: EventsAPI
	volunteerId: UUID
	volunteer: VolunteersAPI
	createdAt: string
	updatedAt: string
}

export type VolunteersPaymentsFromAPI = {
	data: Array<VolunteersPaymentsAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
