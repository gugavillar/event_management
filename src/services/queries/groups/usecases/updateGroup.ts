import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormGroup, GroupAPI } from '../groups.types'

type UpdateEventArgs = {
	groupId: GroupAPI['id']
	data: FormGroup
}

export const updateGroup = async ({ groupId, data }: UpdateEventArgs) => {
	const response = await api.put(ENDPOINTS.UPDATE_GROUP(groupId), { ...data })

	return response.data
}
