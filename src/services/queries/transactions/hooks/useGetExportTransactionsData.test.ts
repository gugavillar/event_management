import { faker } from '@faker-js/faker'
import { renderHook } from '@testing-library/react'

import { createWrapper } from '@/utils/test-utils'

import { getExportTransactions } from '../usecases'
import { useGetExportTransactionsData } from './useGetExportTransactions'

vi.mock('../usecases', () => ({
	getExportTransactions: vi.fn(),
}))

const id = faker.string.uuid()

describe('useGetExportTransactionsData', () => {
	it('should call correctly when have eventId and transactionLength', async () => {
		const mockGetExportTransactions = vi.mocked(getExportTransactions)
		mockGetExportTransactions.mockResolvedValue(new Blob([]))
		const wrapper = createWrapper()

		renderHook(() => useGetExportTransactionsData(id, 1), { wrapper })

		expect(getExportTransactions).toHaveBeenCalledWith(id)
	})

	it('should not call correctly when not have eventId', async () => {
		const mockGetExportTransactions = vi.mocked(getExportTransactions)
		mockGetExportTransactions.mockResolvedValue(new Blob([]))
		const wrapper = createWrapper()

		renderHook(() => useGetExportTransactionsData(''), { wrapper })

		expect(getExportTransactions).not.toHaveBeenCalled()
	})

	it('should not call correctly when not have transactionLength', async () => {
		const mockGetExportTransactions = vi.mocked(getExportTransactions)
		mockGetExportTransactions.mockResolvedValue(new Blob([]))
		const wrapper = createWrapper()

		renderHook(() => useGetExportTransactionsData(id), { wrapper })

		expect(getExportTransactions).not.toHaveBeenCalled()
	})
})
