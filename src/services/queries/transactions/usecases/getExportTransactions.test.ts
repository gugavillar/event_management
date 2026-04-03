import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { ENDPOINTS } from '@/services/endpoints'

import { getExportTransactions } from './getExportTransactions'

vi.mock('../usecases', () => ({
	getExportTransactions: vi.fn(),
}))

const id = faker.string.uuid()

describe('getExportTransactions', () => {
	it('should return correctly file', async () => {
		mockAxios.onGet(ENDPOINTS.EXPORT_TRANSACTIONS_DATA(id)).reply(200, new Blob([]))
		const response = await getExportTransactions(id)
		expect(response).toBeInstanceOf(Blob)
	})
})
