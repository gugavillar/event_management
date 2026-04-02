import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { blockOrUnblockUser } from '../usecases'
import { useBlockOrUnblockUser } from './useBlockOrUnblockUser'

vi.mock('../usecases', () => ({
	blockOrUnblockUser: vi.fn(),
}))

const id = faker.string.uuid() as UUID

describe('useBlockOrUnblockUser', () => {
	it('should block or unblock a user', async () => {
		const mockBlockOrUnblockUser = vi.mocked(blockOrUnblockUser)
		mockBlockOrUnblockUser.mockResolvedValue({
			success: true,
		})
		const queryClient = new QueryClient()
		const wrapper = createWrapper(queryClient)
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const { result } = renderHook(() => useBlockOrUnblockUser(), { wrapper })

		await act(
			async () =>
				await result.current.update({
					blocked: true,
					userId: id,
				})
		)
		expect(blockOrUnblockUser).toHaveBeenCalledWith(
			{
				blocked: true,
				userId: id,
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
