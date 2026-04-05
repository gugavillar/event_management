import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { deleteDonation } from './deleteDonation'

vi.mock('../usecases', () => ({
	deleteDonation: vi.fn(),
}))

const id = faker.string.uuid() as UUID

describe('deleteDonation', () => {
	it('should delete donation correctly', async () => {
		mockAxios.onDelete(ENDPOINTS.DELETE_DONATION(id)).reply(200, { data: { success: true } })
		const response = await deleteDonation(id)
		expect(response).toEqual({ success: true })
	})
})
