import { UUID } from 'crypto'

import { GenderTypeAPI } from '@/constants'

export type FormEvent = {
	name: string
	gender: GenderTypeAPI
	initialDate: string
	finalDate: string
	minAge?: number
	maxAge?: number
	participantPrice: number
	volunteerPrice: number
}

export type EventsAPI = {
	id: UUID
	name: string
	gender: GenderTypeAPI
	initialDate: string
	finalDate: string
	participantPrice: string
	volunteerPrice: string
	isParticipantRegistrationOpen: boolean
	isVolunteerRegistrationOpen: boolean
	isInterestedListOpen: boolean
	minAge: number | null
	maxAge: number | null
	createdAt: string
	updatedAt: string
	userId: UUID
}

export type EventsFromAPI = {
	data: Array<EventsAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
