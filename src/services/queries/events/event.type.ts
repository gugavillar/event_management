import { UUID } from 'crypto'

import { GenderTypeAPI } from '@/constants'

export type FormEvent = {
	name: string
	gender: GenderTypeAPI
	initialDate: string
	finalDate: string
	participantPrice: number
	volunteerPrice: number
}

export type EventsFromAPI = {
	id: UUID
	name: string
	gender: GenderTypeAPI
	initialDate: string
	finalDate: string
	participantPrice: string
	volunteerPrice: string
	createdAt: string
	updatedAt: string
	userId: UUID
}
