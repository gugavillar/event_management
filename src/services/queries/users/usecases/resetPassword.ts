import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { UserAPI } from '../users.type'

type ResetPasswordArgs = {
	userId: UserAPI['id']
}

export const resetPassword = async ({ userId }: ResetPasswordArgs) => {
	const response = await api.patch(ENDPOINTS.RESET_USER_PASSWORD(userId))

	return response.data
}
