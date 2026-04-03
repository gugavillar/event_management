import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { deleteTransaction } from '../usecases'
import { useDeleteTransaction } from './useDeleteTransaction'

vi.mock('../usecases', () => ({
	deleteTransaction: vi.fn(),
}))

const transactionId = faker.string.uuid() as UUID

describe('useDeleteTransaction', () => {
	it('should remove transaction', async () => {
		const mockDeleteTransaction = vi.mocked(deleteTransaction)
		mockDeleteTransaction.mockResolvedValue({
			success: true,
		})
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)

		const { result } = renderHook(() => useDeleteTransaction(), { wrapper })

		await act(async () => await result.current.remove(transactionId))

		expect(deleteTransaction).toHaveBeenCalledWith(transactionId, expect.any(Object))

		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({
				queryKey: [QUERY_KEYS.TRANSACTIONS],
			})
		})
	})
})
