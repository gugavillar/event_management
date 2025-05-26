import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type UpdatePasswordArgs = {
	password: string
}

export const updatePassword = async ({ password }: UpdatePasswordArgs) => {
	const response = await api.patch(ENDPOINTS.UPDATE_USER_PASSWORD, {
		password,
	})

	return response.data
}
