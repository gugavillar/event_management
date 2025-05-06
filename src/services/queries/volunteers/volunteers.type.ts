import { UUID } from 'crypto'

import { CHECK_IN_STATUS, PaymentTypeAPI } from '@/constants'

import { EventsFromAPI } from '../events/event.type'

export type ImportVolunteersDataValues = {
	file: File
	eventId: EventsFromAPI['id']
}

export type VolunteersFunctionsFromAPI = {
	id: UUID
	role: string
	createdAt: string
	updatedAt: string
}

export type VolunteersFromAPI = {
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
	checkIn: CHECK_IN_STATUS | null
	createdAt: string
	updatedAt: string
	eventId: UUID
	event: EventsFromAPI
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
	volunteerRoleId: UUID
	volunteerRole: VolunteersFunctionsFromAPI
}

export type VolunteersFunctionsForm = {
	role: string
}

export type FormVolunteer = {
	name: string
	email: string
	called: string
	birthdate: string
	contact: string
	maritalStatus: string
	parent: string
	contactParent: string
	relationship: string
	city: string
	neighborhood: string
	number: string
	state: string
	street: string
}

export type VolunteersPaymentsFromAPI = {
	id: UUID
	paymentValue: string
	paymentType: (typeof PaymentTypeAPI)[keyof typeof PaymentTypeAPI] | null
	eventId: UUID
	event: EventsFromAPI
	volunteerId: UUID
	volunteer: VolunteersFromAPI
	createdAt: string
	updatedAt: string
}
