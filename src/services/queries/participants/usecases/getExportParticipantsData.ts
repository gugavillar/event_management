import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

export const getExportParticipantsData = async (
	event_id: string,
	isInterested?: boolean
) => {
	const response: BlobPart = await api.get(
		ENDPOINTS.EXPORT_PARTICIPANTS_DATA(event_id),
		{
			params: {
				...(isInterested && { isInterested }),
			},
			responseType: 'arraybuffer',
		}
	)

	return response
}
