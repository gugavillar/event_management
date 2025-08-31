import { UUID } from 'crypto'

import { PaymentTypeAPI } from '@/constants'

import { EventsAPI } from '../events/event.type'

export type DonationAPI = {
	id: UUID
	eventId: UUID
	value: string
	paymentType:
		| `${PaymentTypeAPI.CARD}`
		| `${PaymentTypeAPI.CASH}`
		| `${PaymentTypeAPI.PIX}`
		| null
	createdAt: string
	updatedAt: string
	event: EventsAPI
}

export type FormDonation = {
	eventId: string
	name: string
	type:
		| `${PaymentTypeAPI.CARD}`
		| `${PaymentTypeAPI.CASH}`
		| `${PaymentTypeAPI.PIX}`
		| null
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
