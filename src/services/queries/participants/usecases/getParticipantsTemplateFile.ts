import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getParticipantsTemplateFile = async () => {
	const response: BlobPart = await api.get(
		ENDPOINTS.GET_TEMPLATE_PARTICIPANTS_FILE,
		{
			responseType: 'arraybuffer',
		},
	)

	return response
}
