import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getExportVolunteerData = async (event_id: string) => {
	const response: BlobPart = await api.get(
		ENDPOINTS.EXPORT_VOLUNTEERS_DATA(event_id),
		{
			responseType: 'arraybuffer',
		},
	)

	return response
}
