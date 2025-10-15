import type { ROLES } from '@/constants'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'
import type { UserAPI } from '../users.type'

type UpdateUserRoleArgs = {
	userId: UserAPI['id']
	role: ROLES
}

export const updateUserRole = async ({ userId, role }: UpdateUserRoleArgs) => {
	const response = await api.patch(ENDPOINTS.UPDATE_USER_ROLE(userId), { role })

	return response.data
}
