import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { ENDPOINTS } from '@/services/endpoints'

import { createDonation } from './createDonation'

vi.mock('../usecases', () => ({
	createDonation: vi.fn(),
}))

const mockDonation = {
	eventId: faker.string.uuid(),
	name: faker.person.fullName(),
	type: null,
	value: faker.number.int(),
}

describe('createDonation', () => {
	it('should create donation correctly', async () => {
		mockAxios.onPost(ENDPOINTS.CREATE_DONATION, { ...mockDonation }).reply(200, { data: { ...mockDonation } })
		const response = await createDonation({ ...mockDonation })
		expect(response).toStrictEqual(mockDonation)
	})
})
