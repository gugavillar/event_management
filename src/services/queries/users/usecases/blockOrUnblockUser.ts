import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

type BlockOrUnblockUser = {
	userId: string
	blocked: boolean
}

export const blockOrUnblockUser = async ({
	userId,
	blocked,
}: BlockOrUnblockUser) => {
	const response = await api.patch(ENDPOINTS.BLOCK_OR_UNBLOCK_USER(userId), {
		blocked,
	})

	return response.data
}
