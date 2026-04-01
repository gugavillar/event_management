import { mockAxios } from '@tests'

import { ENDPOINTS } from '@/services/endpoints'

import { updatePassword } from './updatePassword'

describe('updatePassword', () => {
	it('should update correctly user password', async () => {
		mockAxios
			.onPatch(ENDPOINTS.UPDATE_USER_PASSWORD, { password: 'any-password' })
			.reply(200, { data: { success: true }, status: 200 })
		const response = await updatePassword({ password: 'any-password' })
		expect(response).toEqual({ success: true })
	})
})
