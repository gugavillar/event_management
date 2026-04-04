import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { updateRoom } from '../usecases'
import { useUpdateRoom } from './useUpdateRoom'

vi.mock('../usecases', () => ({
	updateRoom: vi.fn(),
}))

const mockRoom = {
	eventId: faker.string.uuid(),
	id: faker.string.uuid() as UUID,
	members: [{ member: faker.string.uuid(), type: MEMBERS.PARTICIPANT }],
	roomNumber: String(faker.number.int()),
}

describe('useUpdateRoom', () => {
	it('should update room and invalidate queries', async () => {
		const mockUpdateRoom = vi.mocked(updateRoom)
		mockUpdateRoom.mockResolvedValue({ data: { success: true } })
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)

		const { result } = renderHook(() => useUpdateRoom(), { wrapper })

		await act(async () => {
			await result.current.update({ data: mockRoom, roomId: mockRoom.id })
		})

		expect(updateRoom).toHaveBeenCalledWith({ data: mockRoom, roomId: mockRoom.id }, expect.any(Object))

		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledTimes(2)
		})
	})
})
