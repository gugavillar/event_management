import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { MEMBERS } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { updateRoom } from './updateRoom'

vi.mock('../usecases', () => ({
	updateRoom: vi.fn(),
}))

const mockRoom = {
	eventId: faker.string.uuid(),
	id: faker.string.uuid() as UUID,
	members: [{ member: faker.string.uuid(), type: MEMBERS.PARTICIPANT }],
	roomNumber: String(faker.number.int()),
}

describe('updateRoom', () => {
	it('should update a room', async () => {
		mockAxios.onPut(ENDPOINTS.UPDATE_ROOM(mockRoom.id), mockRoom).reply(200, { data: { success: true } })
		const response = await updateRoom({ data: mockRoom, roomId: mockRoom.id })
		expect(response).toEqual({ success: true })
	})
})
