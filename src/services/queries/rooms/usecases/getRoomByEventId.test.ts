import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { getRoomByEventId } from './getRoomByEventId'

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

describe('getRoomByEventId', () => {
	it('should return a rooms when eventId is provided', async () => {
		mockAxios.onGet(ENDPOINTS.GET_ROOM_BY_EVENT_ID(eventId)).reply(200, { data: mockRooms })
		const response = await getRoomByEventId(eventId, null)
		expect(response).toEqual(mockRooms)
	})

	it('should receive correct params', async () => {
		mockAxios.onGet(ENDPOINTS.GET_ROOM_BY_EVENT_ID(eventId), { params: { searchMember: search } }).reply((config) => {
			expect(config.params).toEqual({ searchMember: search })
			return [200, { data: mockRooms }]
		})
		await getRoomByEventId(eventId, search)
	})
})
