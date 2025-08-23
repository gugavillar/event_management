import { UUID } from 'crypto'

import { EventsAPI } from '../events/event.type'

export type TransactionsAPI = {
	id: UUID
	eventId: UUID
	type: 'INCOME' | 'OUTCOME'
	description: string
	date: string
	amount: string
	createdAt: string
	event: EventsAPI
}

export type FormTransaction = {
	eventId: string
	amount: number
	date: string
	description: string
	type: TransactionsAPI['type']
}

export type TransactionsFromAPI = {
	data: Array<TransactionsAPI>
	currentPage: number
	perPage: number
	totalCount: number
	totalPages: number
}
