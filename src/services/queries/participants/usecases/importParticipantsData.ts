import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ImportParticipantsDataValues } from '../participants.type'

export const importParticipantsData = async (
	data: ImportParticipantsDataValues,
) => {
	const formData = new FormData()
	formData.append('file', data.file)
	formData.append('eventId', data.eventId)

	const response = await api.post(ENDPOINTS.IMPORT_PARTICIPANTS_DATA, formData)

	return response.data
}
