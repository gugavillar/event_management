import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'

import { TransactionAmountType, TransactionsType } from '@/constants'
import { ENDPOINTS } from '@/services/endpoints'

import { createTransaction } from './createTransaction'

vi.mock('../usecases', () => ({
	createTransaction: vi.fn(),
}))

const mockTransaction = {
	amount: faker.number.int(),
	amountType: TransactionAmountType.ACCOUNT,
	date: new Date().toISOString(),
	description: faker.commerce.product(),
	eventId: faker.string.uuid(),
	type: TransactionsType.INCOME,
}

const transactionId = faker.string.uuid()

describe('createTransaction', () => {
	it('should create transaction', async () => {
		mockAxios.onPost(ENDPOINTS.CREATE_TRANSACTION, { ...mockTransaction }).reply(200, {
			data: {
				...mockTransaction,
				id: transactionId,
			},
		})
		const response = await createTransaction({ ...mockTransaction })
		expect(response).toEqual({
			...mockTransaction,
			id: transactionId,
		})
	})
})
