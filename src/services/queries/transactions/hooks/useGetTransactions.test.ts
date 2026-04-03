import { faker } from '@faker-js/faker'
import { act, renderHook, waitFor } from '@testing-library/react'

import { TransactionAmountType, TransactionsType } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import * as usecases from '../usecases'
import { useGetTransactions } from './useGetTransactions'

vi.mock('../usecases', () => ({
	getTransactions: vi.fn(),
}))

const mockTransactions = {
	currentPage: faker.number.int(),
	data: [
		{
			amount: faker.commerce.price(),
			amountType: TransactionAmountType.ACCOUNT,
			createdAt: new Date().toISOString(),
			date: new Date().toISOString(),
			description: faker.commerce.product(),
			eventId: faker.string.uuid(),
			id: faker.string.uuid(),
			type: TransactionsType.INCOME,
		},
	],
	perPage: faker.number.int(),
	sumOfAllIncome: faker.number.int(),
	totalCount: faker.number.int(),
	totalOfAccountAndCash: {
		totalAccountIncome: faker.number.int(),
		totalAccountOutcome: faker.number.int(),
		totalCashIncome: faker.number.int(),
		totalCashOutcome: faker.number.int(),
	},
	totalPages: faker.number.int(),
}

const eventId = faker.string.uuid()

describe('useGetTransactions', () => {
	it('should not run getTransactions on mount', async () => {
		const mockGetTransactions = vi.mocked(usecases.getTransactions)
		mockGetTransactions.mockResolvedValue({
			...mockTransactions,
		})
		const wrapper = createWrapper()

		renderHook(() => useGetTransactions(), { wrapper })

		expect(usecases.getTransactions).not.toHaveBeenCalled()
	})

	it('should run getTransactions after set event id', async () => {
		const mockGetTransactions = vi.mocked(usecases.getTransactions)
		mockGetTransactions.mockResolvedValue({
			...mockTransactions,
		})
		const wrapper = createWrapper()

		const { result } = renderHook(() => useGetTransactions(), { wrapper })

		await act(async () => {
			await result.current.setEventId(eventId)
			await result.current.setPage(1)
		})

		await waitFor(() => {
			expect(result.current.eventId).toBe(eventId)
		})

		await waitFor(() => {
			expect(usecases.getTransactions).toHaveBeenCalledWith({
				eventId,
				page: 1,
				searchTransaction: null,
			})
		})
	})
})
