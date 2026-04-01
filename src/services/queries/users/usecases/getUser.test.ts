import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { getUser } from './getUser'

const id = faker.string.uuid() as UUID
const role = JSON.stringify({
	dashboard: true,
	donations: false,
	events: false,
	groups: false,
	meetings: false,
	participants: {
		interest: false,
		list: false,
		payment: false,
		picture: false,
	},
	rooms: false,
	transactions: false,
	users: false,
	volunteers: {
		functions: false,
		list: false,
		payment: false,
	},
})

describe('getUser', () => {
	it('should get correct user', async () => {
		mockAxios.onGet(ENDPOINTS.GET_USER(id)).reply(200, { data: { role }, status: 200 })
		const response = await getUser(id)
		expect(response).toEqual({ role })
	})
})
