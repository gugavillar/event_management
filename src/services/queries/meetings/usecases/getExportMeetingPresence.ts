import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getExportMeetingPresence = async (event_id: string) => {
	const response: BlobPart = await api.get(
		ENDPOINTS.EXPORT_MEETING_PRESENCE(event_id),
		{
			responseType: 'arraybuffer',
		},
	)

	return response
}
