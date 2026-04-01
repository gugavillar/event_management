import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { blockOrUnblockUser } from './blockOrUnblockUser'

const id = faker.string.uuid() as UUID

describe('blockOrUnblockUser', () => {
	it('should block or unblock user correctly', async () => {
		mockAxios.onPatch(ENDPOINTS.BLOCK_OR_UNBLOCK_USER(id), { blocked: true }).reply(200, {
			data: {
				success: true,
			},
			status: 200,
		})
		const response = await blockOrUnblockUser({ blocked: true, userId: id })
		expect(response).toEqual({ success: true })
	})
})
