import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { deleteRoom } from '../usecases'
import { useDeleteRoom } from './useDeleteRoom'

vi.mock('../usecases', () => ({
	deleteRoom: vi.fn(),
}))

const roomId = faker.string.uuid() as UUID

describe('useDeleteRoom', () => {
	it('should delete a room and invalidate queries', async () => {
		const mockDeleteRoom = vi.mocked(deleteRoom)
		mockDeleteRoom.mockResolvedValue({ data: { success: true } })
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)
		const { result } = renderHook(() => useDeleteRoom(), { wrapper })

		await act(async () => {
			await result.current.remove(roomId)
		})

		expect(deleteRoom).toHaveBeenCalledWith(roomId, expect.any(Object))

		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({
				queryKey: [QUERY_KEYS.ROOMS],
			})
		})
	})
})
