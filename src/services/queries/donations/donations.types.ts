import { UUID } from 'crypto'

import { EventsAPI } from '../events/event.type'

export type DonationAPI = {
	id: UUID
	eventId: UUID
	value: string
	createdAt: string
	updatedAt: string
	event: EventsAPI
}

export type FormDonation = {
	eventId: string
	name: string
	value: number
}

export type DonationsFromAPI = {
	data: Array<DonationAPI>
	sumOfAllDonations: number
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
