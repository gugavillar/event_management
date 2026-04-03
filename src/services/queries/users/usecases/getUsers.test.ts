import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { LIMIT_PER_PAGE } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { getUsers } from './getUsers'

const mockUsers = (quantity: number) => {
	return Array.from({ length: quantity }, () => ({
		email: faker.internet.email(),
		id: faker.string.uuid(),
		name: faker.person.fullName(),
	}))
}

describe('getUsers', () => {
	it('should get users correctly', async () => {
		const users = mockUsers(10)
		mockAxios
			.onGet(ENDPOINTS.GET_USERS, { params: { limit: LIMIT_PER_PAGE, pageUser: 1 } })
			.reply(200, { data: { users }, status: 200 })
		const response = await getUsers({ page: 1 })
		expect(response).toEqual({ users })
	})

	it('should get users correctly with search', async () => {
		const users = mockUsers(10)
		mockAxios
			.onGet(ENDPOINTS.GET_USERS, { params: { limit: LIMIT_PER_PAGE, pageUser: 1, searchUser: users[0].name } })
			.reply((config) => {
				expect(config.params).toEqual({ limit: LIMIT_PER_PAGE, pageUser: 1, searchUser: users[0].name })
				return [200, { data: { users: users[0] }, status: 200 }]
			})
		await getUsers({ page: 1, searchUser: users[0].name })
	})
})
