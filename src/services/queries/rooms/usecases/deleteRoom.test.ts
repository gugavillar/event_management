import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { deleteRoom } from './deleteRoom'

vi.mock('../usecases', () => ({
	deleteRoom: vi.fn(),
}))

const id = faker.string.uuid() as UUID

describe('deleteRoom', () => {
	it('should delete a room', async () => {
		mockAxios.onDelete(ENDPOINTS.DELETE_ROOM(id)).reply(200, { data: { success: true } })
		const response = await deleteRoom(id)
		expect(response).toStrictEqual({ success: true })
	})
})
