import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { FormGroup } from '../groups.types'

export const createGroup = async (data: FormGroup) => {
	const response = await api.post(ENDPOINTS.CREATE_GROUP, { ...data })

	return response.data
}
