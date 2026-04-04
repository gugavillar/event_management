import { faker } from '@faker-js/faker'
import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'

import { MEMBERS, QUERY_KEYS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { createRoom } from '../usecases'
import { useCreateRoom } from './useCreateRoom'

vi.mock('../usecases', () => ({
	createRoom: vi.fn(),
}))

const mockRoom = {
	eventId: faker.string.uuid(),
	members: [{ member: faker.string.uuid(), type: MEMBERS.PARTICIPANT }],
	roomNumber: String(faker.number.int()),
}

const id = faker.string.uuid()

describe('useCreateRoom', () => {
	it('should create a room and invalidate queries', async () => {
		const mockCreateRoom = vi.mocked(createRoom)
		mockCreateRoom.mockResolvedValue({
			data: {
				...mockRoom,
				id,
			},
		})
		const queryClient = new QueryClient()
		const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
		const wrapper = createWrapper(queryClient)

		const { result } = renderHook(() => useCreateRoom(), { wrapper })

		await act(async () => {
			await result.current.create(mockRoom)
		})

		expect(createRoom).toHaveBeenCalledWith(
			{
				...mockRoom,
			},
			expect.any(Object)
		)
		await waitFor(() => {
			expect(invalidateQueries).toHaveBeenCalledWith({
				queryKey: [QUERY_KEYS.ROOMS],
			})
		})
	})
})
