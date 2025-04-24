import { UUID } from 'crypto'

import { CHECK_IN_STATUS } from '@/constants'

import { EventsFromAPI } from '../events/event.type'

export type ImportVolunteersDataValues = {
	file: File
	eventId: EventsFromAPI['id']
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
	checkIn: (typeof CHECK_IN_STATUS)[keyof typeof CHECK_IN_STATUS] | null
	createdAt: string
	updatedAt: string
	eventId: UUID
	eventRolesId: UUID
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
	role: {
		id: UUID
		role: string
		eventId: UUID
	}
	event: EventsFromAPI
}

export type VolunteersFunctionsForm = {
	role: string
}
