import { faker } from '@faker-js/faker'
import { mockAxios } from '@tests'
import type { UUID } from 'crypto'

import { ENDPOINTS } from '@/services/endpoints'

import { resetPassword } from './resetPassword'

const id = faker.string.uuid() as UUID

describe('resetPassword', () => {
	it('should return correctly when reset password', async () => {
		mockAxios.onPatch(ENDPOINTS.RESET_USER_PASSWORD(id)).reply(200, { data: { id }, status: 200 })
		const response = await resetPassword({ userId: id })
		expect(response).toEqual({ id })
	})
})
