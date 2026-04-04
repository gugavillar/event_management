import { faker } from '@faker-js/faker'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { createWrapper } from '@/utils/test-utils'

import { getRoomByEventId } from '../usecases'
import { useGetRoomByEventId } from './useGetRoomByEventId'

vi.mock('../usecases', () => ({
	getRoomByEventId: vi.fn(),
}))

const mockRooms = [
	{
		createdAt: new Date().toISOString(),
		eventId: faker.string.uuid(),
		id: faker.string.uuid(),
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
	},
]

const eventId = faker.string.uuid() as UUID
const search = faker.person.fullName()

describe('useGetRoomByEventId', () => {
	it('should not call getRoomByEventId when eventId is undefined', async () => {
		const mockGetRoomByEventId = vi.mocked(getRoomByEventId)
		mockGetRoomByEventId.mockResolvedValue(mockRooms)
		const wrapper = createWrapper()
		renderHook(() => useGetRoomByEventId(), { wrapper })

		expect(getRoomByEventId).not.toHaveBeenCalled()
	})

	it('should called getRoomByEventId when eventId is defined', async () => {
		const mockGetRoomByEventId = vi.mocked(getRoomByEventId)
		mockGetRoomByEventId.mockResolvedValue(mockRooms)
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetRoomByEventId(), { wrapper })

		await act(async () => await result.current.setRoomEventId(eventId))

		await waitFor(() => expect(getRoomByEventId).toHaveBeenCalledWith(eventId, null))
	})

	it('should set correctly search member', async () => {
		const mockGetRoomByEventId = vi.mocked(getRoomByEventId)
		mockGetRoomByEventId.mockResolvedValue(mockRooms)
		const wrapper = createWrapper()
		const { result } = renderHook(() => useGetRoomByEventId(), { wrapper })

		await act(async () => await result.current.setSearchMemberRoom(search))

		await waitFor(() => expect(result.current.searchMemberRoom).toBe(search))
	})
})
