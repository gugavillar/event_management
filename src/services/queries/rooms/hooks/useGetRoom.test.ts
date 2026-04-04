import { faker } from '@faker-js/faker'
import { renderHook } from '@testing-library/react'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { getRoom } from '../usecases'
import { useGetRoom } from './useGetRoom'

vi.mock('../usecases', () => ({
	getRoom: vi.fn(),
}))

const mockRoom = {
	createdAt: new Date().toISOString(),
	eventId: faker.string.uuid(),
	id: faker.string.uuid() as UUID,
	members: [
		{
			id: faker.string.uuid(),
			participantId: faker.string.uuid(),
			roomId: faker.string.uuid(),
			type: MEMBERS.PARTICIPANT,
			volunteerId: null,
		},
	],
	roomNumber: String(faker.number.int()),
	updatedAt: new Date().toISOString(),
}

describe('useGetRoom', () => {
	it('should not called getRoom when roomId is null', async () => {
		const mockGetRoom = vi.mocked(getRoom)
		mockGetRoom.mockResolvedValue(mockRoom)
		const wrapper = createWrapper()
		renderHook(() => useGetRoom(null), { wrapper })

		expect(getRoom).not.toHaveBeenCalled()
	})

	it('should called getRoom when roomId is not null', async () => {
		const mockGetRoom = vi.mocked(getRoom)
		mockGetRoom.mockResolvedValue(mockRoom)
		const wrapper = createWrapper()
		renderHook(() => useGetRoom(mockRoom.id), { wrapper })

		expect(getRoom).toHaveBeenCalledWith(mockRoom.id)
	})
})
