import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { getRoom } from './getRoom'

vi.mock('../usecases', () => ({
	getRoom: jest.fn(),
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

describe('getRoom', () => {
	it('should return a room', async () => {
		mockAxios.onGet(ENDPOINTS.GET_ROOM(mockRoom.id)).reply(200, { data: mockRoom })
		const response = await getRoom(mockRoom.id)
		expect(response).toEqual(mockRoom)
	})
})
