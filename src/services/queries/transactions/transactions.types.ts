import type { UUID } from 'node:crypto'

import type { TransactionAmountType, TransactionsType } from '@/constants'

import type { EventsAPI } from '../events/event.type'

export type TransactionsAPI = {
	id: UUID
	eventId: UUID
	type: TransactionsType
	description: string
	date: string
	amount: string
	amountType: TransactionAmountType
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
