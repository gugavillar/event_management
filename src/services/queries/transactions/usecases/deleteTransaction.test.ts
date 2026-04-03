import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { deleteTransaction } from './deleteTransaction'

vi.mock('../usecases', () => ({
	deleteTransaction: vi.fn(),
}))

const id = faker.string.uuid() as UUID

describe('deleteTransaction', () => {
	it('should remove transaction', async () => {
		mockAxios.onDelete(ENDPOINTS.DELETE_TRANSACTION(id)).reply(200, { data: { success: true } })
		const result = await deleteTransaction(id)
		expect(result).toEqual({ success: true })
	})
})
