export const BASE_URL = process.env.API_BASE_URL

const BASE_PATH = {
	EVENTS: '/events',
}

export const ENDPOINTS = {
	CREATE_EVENT: `${BASE_PATH.EVENTS}`,
	GET_EVENTS: `${BASE_PATH.EVENTS}`,
	GET_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
}
