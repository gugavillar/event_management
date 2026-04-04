import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { LIMIT_PER_PAGE, TransactionsType } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { getTransactions } from './getTransactions'

vi.mock('../usecases', () => ({
	getTransactions: vi.fn(),
}))

const mockTransactions = {
	currentPage: 1,
	data: [
		{
			amount: faker.finance.amount(),
			amountType: 'ACCOUNT',
			createdAt: new Date().toISOString(),
			date: new Date().toISOString(),
			description: faker.commerce.product(),
			eventId: faker.string.uuid(),
			id: faker.string.uuid(),
			type: TransactionsType.INCOME,
		},
	],
	perPage: 10,
	sumOfAllIncome: null,
	sumOfAllOutcome: null,
	totalCount: 1,
	totalOfAccountAndCash: {
		totalAccountIncome: 1,
		totalAccountOutcome: 1,
		totalCashIncome: 1,
		totalCashOutcome: 1,
	},
	totalPages: 1,
}

describe('getTransactions', () => {
	it('should return transactions', async () => {
		mockAxios.onGet(ENDPOINTS.GET_TRANSACTIONS).reply(200, { data: mockTransactions })
		const response = await getTransactions({ eventId: mockTransactions.data[0].eventId, page: 1 })
		expect(response).toEqual(mockTransactions)
	})

	it('should pass correct params', async () => {
		mockAxios
			.onGet(ENDPOINTS.GET_TRANSACTIONS, {
				params: { eventId: mockTransactions.data[0].eventId, limit: LIMIT_PER_PAGE, page: 1 },
			})
			.reply((config) => {
				expect(config.params).toEqual({ eventId: mockTransactions.data[0].eventId, limit: LIMIT_PER_PAGE, page: 1 })
				return [200, { data: mockTransactions }]
			})
		await getTransactions({ eventId: mockTransactions.data[0].eventId, page: 1 })
	})

	it('should pass correct param searchTransaction', async () => {
		mockAxios
			.onGet(ENDPOINTS.GET_TRANSACTIONS, {
				params: {
					eventId: mockTransactions.data[0].eventId,
					limit: LIMIT_PER_PAGE,
					page: 1,
					searchTransaction: 'any-transaction',
				},
			})
			.reply((config) => {
				expect(config.params).toEqual({
					eventId: mockTransactions.data[0].eventId,
					limit: LIMIT_PER_PAGE,
					page: 1,
					searchTransaction: 'any-transaction',
				})
				return [200, { data: mockTransactions }]
			})
		await getTransactions({ eventId: mockTransactions.data[0].eventId, page: 1, searchTransaction: 'any-transaction' })
	})

	it('should pass correct param eventId', async () => {
		mockAxios
			.onGet(ENDPOINTS.GET_TRANSACTIONS, {
				params: { eventId: mockTransactions.data[0].eventId, limit: LIMIT_PER_PAGE, page: 1 },
			})
			.reply((config) => {
				expect(config.params).toEqual({ eventId: mockTransactions.data[0].eventId, limit: LIMIT_PER_PAGE, page: 1 })
				return [200, { data: mockTransactions }]
			})
		await getTransactions({ eventId: mockTransactions.data[0].eventId, page: 1 })
	})
})
