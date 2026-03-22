import type { UserPermissionDrawerType } from '@/components/Organisms/UserPermissionDrawer/UserPermissionDrawer.schema'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { UserAPI } from '../users.type'

type UpdateUserRoleArgs = {
	userId: UserAPI['id']
	permissions: UserPermissionDrawerType
}

export const updateUserRole = async ({ userId, permissions }: UpdateUserRoleArgs) => {
	const response = await api.patch(ENDPOINTS.UPDATE_USER_ROLE(userId), { permissions })

	return response.data
}
