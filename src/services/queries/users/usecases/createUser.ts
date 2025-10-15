import type { UserSchemaType } from '@/components/Organisms/UserDrawer/UserDrawer.schema'
import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const createUser = async (data: UserSchemaType) => {
	const response = await api.post(ENDPOINTS.CREATE_USER, { ...data })

	return response.data
}
