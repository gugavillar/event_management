export const BASE_URL = process.env.API_BASE_URL

const BASE_PATH = {
	EVENTS: '/events',
	PARTICIPANTS: '/participants',
	VOLUNTEERS: '/volunteers',
	DASHBOARD: '/dashboard',
	USERS: '/users',
	GROUPS: '/groups',
	ROOMS: '/rooms',
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
	EXPORT_PARTICIPANTS_DATA: (event_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/files/${event_id}`,
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
	CREATE_VOLUNTEER: BASE_PATH.VOLUNTEERS,
	EXPORT_VOLUNTEERS_DATA: (event_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/files/${event_id}`,
	GET_VOLUNTEERS: BASE_PATH.VOLUNTEERS,
	GET_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	DELETE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	UPDATE_CHECK_IN_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/check-in`,
	UPDATE_VOLUNTEER_FUNCTION: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/function`,
	UPDATE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	GET_VOLUNTEERS_PAYMENTS: `${BASE_PATH.VOLUNTEERS}/payments`,
	UPDATE_VOLUNTEER_PAYMENT: (payment_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/payments/${payment_id}`,

	// Functions
	CREATE_FUNCTION: `${BASE_PATH.VOLUNTEERS}/functions`,
	GET_FUNCTIONS: `${BASE_PATH.VOLUNTEERS}/functions`,
	UPDATE_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,
	DELETE_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,

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

	// Groups
	CREATE_GROUP: BASE_PATH.GROUPS,
	GET_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,
	GET_GROUP_BY_EVENT_ID: (event_id: string) =>
		`${BASE_PATH.GROUPS}/events/${event_id}`,
	DELETE_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,
	UPDATE_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,

	// Rooms
	CREATE_ROOM: BASE_PATH.ROOMS,
	GET_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
	GET_ROOM_BY_EVENT_ID: (event_id: string) =>
		`${BASE_PATH.ROOMS}/events/${event_id}`,
	DELETE_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
	UPDATE_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
}
