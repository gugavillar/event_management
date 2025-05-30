export const BASE_URL = process.env.API_BASE_URL

const BASE_PATH = {
	EVENTS: '/events',
	PARTICIPANTS: '/participants',
	VOLUNTEERS: '/volunteers',
	DASHBOARD: '/dashboard',
	USERS: '/users',
}

export const ENDPOINTS = {
	// Events
	CREATE_EVENT: BASE_PATH.EVENTS,
	GET_EVENTS: BASE_PATH.EVENTS,
	GET_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	DELETE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	UPDATE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,

	// Participants
	CREATE_PARTICIPANT: BASE_PATH.PARTICIPANTS,
	IMPORT_PARTICIPANTS_DATA: `${BASE_PATH.PARTICIPANTS}/files`,
	GET_TEMPLATE_PARTICIPANTS_FILE: `${BASE_PATH.PARTICIPANTS}/files`,
	GET_PARTICIPANTS: BASE_PATH.PARTICIPANTS,
	GET_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	DELETE_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	UPDATE_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	UPDATE_CHECK_IN_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}/check-in`,
	GET_PARTICIPANTS_PAYMENTS: `${BASE_PATH.PARTICIPANTS}/payments`,
	UPDATE_PARTICIPANT_PAYMENT: (payment_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/payments/${payment_id}`,

	// Volunteers
	GET_TEMPLATE_VOLUNTEERS_FILE: `${BASE_PATH.VOLUNTEERS}/files`,
	IMPORT_VOLUNTEERS_DATA: `${BASE_PATH.VOLUNTEERS}/files`,
	GET_VOLUNTEERS: BASE_PATH.VOLUNTEERS,
	GET_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	CREATE_FUNCTION: `${BASE_PATH.VOLUNTEERS}/functions`,
	GET_VOLUNTEERS_FUNCTIONS: `${BASE_PATH.VOLUNTEERS}/functions`,
	DELETE_VOLUNTEER_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,
	DELETE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	UPDATE_VOLUNTEER_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,
	UPDATE_CHECK_IN_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/check-in`,
	UPDATE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	UPDATE_VOLUNTEER_ROLE: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/function`,
	GET_VOLUNTEERS_PAYMENTS: `${BASE_PATH.VOLUNTEERS}/payments`,
	UPDATE_VOLUNTEER_PAYMENT: (payment_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/payments/${payment_id}`,

	// Dashboard
	GET_DASHBOARD: BASE_PATH.DASHBOARD,

	// Users
	GET_USERS: BASE_PATH.USERS,
	CREATE_USER: BASE_PATH.USERS,
	UPDATE_USER_ROLE: (user_id: string) => `${BASE_PATH.USERS}/${user_id}/role`,
	RESET_USER_PASSWORD: (user_id: string) =>
		`${BASE_PATH.USERS}/${user_id}/reset`,
	UPDATE_USER_PASSWORD: BASE_PATH.USERS,
	BLOCK_OR_UNBLOCK_USER: (user_id: string) =>
		`${BASE_PATH.USERS}/${user_id}/block`,
}
