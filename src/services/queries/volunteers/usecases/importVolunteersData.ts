import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import { ImportVolunteersDataValues } from '../volunteers.type'

export const importVolunteersData = async (
	data: ImportVolunteersDataValues,
) => {
	const formData = new FormData()
	formData.append('file', data.file)
	formData.append('eventId', data.eventId)

	const response = await api.post(ENDPOINTS.IMPORT_VOLUNTEERS_DATA, formData)

	return response.data
}
