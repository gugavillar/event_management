import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'

import { QUERY_KEYS, TransactionAmountType, TransactionsType } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { createTransaction } from '../usecases'
import { useCreateTransaction } from './useCreateTransaction'

vi.mock('../usecases', () => ({
	createTransaction: vi.fn(),
}))

const mockTransaction = {
	amount: faker.number.int(),
	amountType: TransactionAmountType.ACCOUNT,
	date: new Date().toISOString(),
	description: faker.commerce.product(),
	eventId: faker.string.uuid(),
	type: TransactionsType.INCOME,
}

const transactionId = faker.string.uuid()

describe('useCreateTransaction', () => {
	it('should call createTransaction', async () => {
		const mockCreateTransaction = vi.mocked(createTransaction)
		mockCreateTransaction.mockResolvedValue({
			...mockTransaction,
			id: transactionId,
		})
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)
		const { result } = renderHook(() => useCreateTransaction(), { wrapper })

		await act(async () => await result.current.create({ ...mockTransaction }))

		expect(mockCreateTransaction).toHaveBeenCalledWith({ ...mockTransaction }, expect.any(Object))
		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEYS.TRANSACTIONS] })
		})
	})
})
