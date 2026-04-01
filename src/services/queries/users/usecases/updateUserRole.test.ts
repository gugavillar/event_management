import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import type { UUID } from 'node:crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { updateUserRole } from './updateUserRole'

const id = faker.string.uuid() as UUID
const permissions = {
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
}

describe('updateUserRole', () => {
	it('should update correctly user role', async () => {
		mockAxios
			.onPatch(ENDPOINTS.UPDATE_USER_ROLE(id), { permissions })
			.reply(200, { data: { success: true }, status: 200 })
		const response = await updateUserRole({ permissions, userId: id })
		expect(response).toEqual({ success: true })
	})
})
