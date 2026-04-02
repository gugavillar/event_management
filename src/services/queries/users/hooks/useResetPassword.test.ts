import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { resetPassword } from '../usecases'
import { useResetPassword } from './useResetPassword'

vi.mock('../usecases', () => ({
	resetPassword: vi.fn(),
}))

const mockData = faker.string.uuid() as UUID

describe('useResetPassword', () => {
	it('should create and invalidate users query', async () => {
		const mockResetPassword = vi.mocked(resetPassword)
		mockResetPassword.mockResolvedValue({ id: mockData })
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)

		const { result } = renderHook(() => useResetPassword(), { wrapper })

		await act(async () => await result.current.update({ userId: mockData }))

		expect(resetPassword).toHaveBeenCalledWith(
			{
				userId: mockData,
			},
			expect.any(Object)
		)
		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({
				queryKey: [QUERY_KEYS.USERS],
			})
		})
	})
})
