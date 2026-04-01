import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { ENDPOINTS } from '@/services/endpoints'

import { createUser } from './createUser'

const mockUser = {
	email: faker.internet.email(),
	name: faker.person.fullName(),
}

const mockId = faker.string.uuid()

describe('createUser', () => {
	it('should create correctly user', async () => {
		mockAxios.onPost(ENDPOINTS.CREATE_USER, { ...mockUser }).reply(200, {
			data: {
				...mockUser,
				id: mockId,
			},
			status: 200,
		})
		const response = await createUser(mockUser)
		expect(response).toEqual({ ...mockUser, id: mockId })
	})
})
