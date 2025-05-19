import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { UserAPI } from '../users.type'

type UpdateUserPasswordArgs = {
	userId: UserAPI['id']
}

export const updateUserPassword = async ({
	userId,
}: UpdateUserPasswordArgs) => {
	const response = await api.patch(ENDPOINTS.UPDATE_USER_PASSWORD(userId))

	return response.data
}
