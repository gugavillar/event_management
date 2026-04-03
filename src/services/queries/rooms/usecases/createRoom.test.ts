import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { MEMBERS } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { createRoom } from './createRoom'

vi.mock('../usecases', () => ({
	createRoom: vi.fn(),
}))

const mockRoom = {
	eventId: faker.string.uuid(),
	members: [{ member: faker.string.uuid(), type: MEMBERS.PARTICIPANT }],
	roomNumber: String(faker.number.int()),
}

const id = faker.string.uuid()

describe('createRoom', () => {
	it('should create a room', async () => {
		mockAxios.onPost(ENDPOINTS.CREATE_ROOM, { ...mockRoom }).reply(200, { data: { ...mockRoom, id } })
		const response = await createRoom({ ...mockRoom })
		expect(response).toStrictEqual({ ...mockRoom, id })
	})
})
