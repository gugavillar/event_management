export const BASE_URL = process.env.API_BASE_URL

const BASE_PATH = {
	EVENTS: '/events',
	PARTICIPANTS: '/participants',
}

export const ENDPOINTS = {
	// Events
	CREATE_EVENT: `${BASE_PATH.EVENTS}`,
	GET_EVENTS: `${BASE_PATH.EVENTS}`,
	GET_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	DELETE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	UPDATE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,

	// Participants
	IMPORT_PARTICIPANTS_DATA: `${BASE_PATH.PARTICIPANTS}/files`,
	GET_TEMPLATE_PARTICIPANTS_FILE: `${BASE_PATH.PARTICIPANTS}/files`,
	GET_PARTICIPANTS: `${BASE_PATH.PARTICIPANTS}`,
	DELETE_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
}
