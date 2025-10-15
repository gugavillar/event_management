import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { FormGroup, GroupAPI } from '../groups.types'

type UpdateGroupArgs = {
	groupId: GroupAPI['id']
	data: FormGroup
}

export const updateGroup = async ({ groupId, data }: UpdateGroupArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_GROUP(groupId), { ...data })

	return response.data
}
