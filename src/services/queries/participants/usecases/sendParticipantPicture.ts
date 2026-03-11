import { api } from '@/services/api'
import { ENDPOINTS } from '@/services/endpoints'

import type { SaveParticipantPictureType } from '../participants.type'

export const sendParticipantPicture = async (data: SaveParticipantPictureType) => {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			formData.append(key, value as any)
		}
	})

	const participantId = data.participantId

	const response = await api.patch(ENDPOINTS.SAVE_PARTICIPANT_PICTURE(participantId), formData)

	return response.data
}
