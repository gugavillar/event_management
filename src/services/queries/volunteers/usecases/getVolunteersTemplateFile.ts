import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getVolunteersTemplateFile = async () => {
	const response: BlobPart = await api.get(
		ENDPOINTS.GET_TEMPLATE_VOLUNTEERS_FILE,
		{
			responseType: 'arraybuffer',
		},
	)

	return response
}
