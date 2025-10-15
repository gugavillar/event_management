import type { UUID } from 'crypto'

import type { EventsAPI } from '../events/event.type'

export type TransactionsAPI = {
	id: UUID
	eventId: UUID
	type: 'INCOME' | 'OUTCOME'
	description: string
	date: string
	amount: string
	amountType: 'ACCOUNT' | 'CASH'
	createdAt: string
	event: EventsAPI
}

export type FormTransaction = {
	eventId: string
	amount: number
	amountType: TransactionsAPI['amountType']
	date: string
	description: string
	type: TransactionsAPI['type']
}

export type TransactionsFromAPI = {
	data: Array<TransactionsAPI>
	currentPage: number
	sumOfAllIncome: number | null
	sumOfAllOutcome: number | null
	perPage: number
	totalCount: number
	totalPages: number
	totalOfAccountAndCash: {
		totalAccountIncome: number
		totalAccountOutcome: number
		totalCashIncome: number
		totalCashOutcome: number
	}
}
