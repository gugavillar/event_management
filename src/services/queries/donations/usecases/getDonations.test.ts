import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { LIMIT_PER_PAGE, PaymentTypeAPI } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { getDonations } from './getDonations'

vi.mock('../usecases', () => ({
	getDonations: vi.fn(),
}))

const id = faker.string.uuid()

const mockDonations = {
	currentPage: 1,
	data: [
		{
			createdAt: new Date().toISOString(),
			event: {
				name: faker.string.sample(),
			},
			id: faker.string.uuid(),
			name: faker.person.fullName(),
			type: PaymentTypeAPI.PIX,
			updatedAt: new Date().toISOString(),
			value: faker.string.numeric(),
		},
	],
	perPage: faker.number.int(),
	sumOfAllDonations: faker.number.int(),
	totalCount: faker.number.int(),
	totalPages: faker.number.int(),
}

describe('getDonations', () => {
	it('should get donations correctly', async () => {
		mockAxios
			.onGet(ENDPOINTS.GET_DONATIONS, {
				params: {
					eventId: id,
					limit: LIMIT_PER_PAGE,
					page: 1,
				},
			})
			.reply(200, { data: mockDonations })
		const response = await getDonations({ eventId: id, page: 1 })
		expect(response).toEqual(mockDonations)
	})

	it('should pass correctly params', async () => {
		mockAxios
			.onGet(ENDPOINTS.GET_DONATIONS, {
				params: {
					eventId: id,
					limit: LIMIT_PER_PAGE,
					page: 1,
				},
			})
			.reply((config) => {
				expect(config.params).toEqual({
					eventId: id,
					limit: LIMIT_PER_PAGE,
					page: 1,
				})
				return [200, { data: mockDonations }]
			})
		await getDonations({ eventId: id, page: 1 })
	})
})
