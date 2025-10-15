export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const BASE_PATH = {
	DASHBOARD: '/dashboard',
	DONATIONS: '/donations',
	EVENTS: '/events',
	GROUPS: '/groups',
	MEETINGS: '/meetings',
	PARTICIPANTS: '/participants',
	ROOMS: '/rooms',
	TRANSACTIONS: '/transactions',
	USERS: '/users',
	VOLUNTEERS: '/volunteers',
}

export const ENDPOINTS = {
	BLOCK_OR_UNBLOCK_USER: (user_id: string) =>
		`${BASE_PATH.USERS}/${user_id}/block`,

	// Donations
	CREATE_DONATION: BASE_PATH.DONATIONS,
	// Events
	CREATE_EVENT: BASE_PATH.EVENTS,

	// Functions
	CREATE_FUNCTION: `${BASE_PATH.VOLUNTEERS}/functions`,

	// Groups
	CREATE_GROUP: BASE_PATH.GROUPS,

	// Meetings
	CREATE_MEETING: BASE_PATH.MEETINGS,
	CREATE_MEETING_PRESENCE: `${BASE_PATH.MEETINGS}/presence`,

	// Participants
	CREATE_PARTICIPANT: BASE_PATH.PARTICIPANTS,
	CREATE_PARTICIPANT_PAYMENT: `${BASE_PATH.PARTICIPANTS}/payments`,

	// Rooms
	CREATE_ROOM: BASE_PATH.ROOMS,
	CREATE_TRANSACTION: BASE_PATH.TRANSACTIONS,
	CREATE_USER: BASE_PATH.USERS,

	// Volunteers
	CREATE_VOLUNTEER: BASE_PATH.VOLUNTEERS,
	CREATE_VOLUNTEER_PAYMENT: `${BASE_PATH.VOLUNTEERS}/payments`,
	DELETE_DONATION: (donation_id: string) =>
		`${BASE_PATH.DONATIONS}/${donation_id}`,
	DELETE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	DELETE_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,
	DELETE_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,
	DELETE_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	DELETE_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
	DELETE_TRANSACTION: (transaction_id: string) =>
		`${BASE_PATH.TRANSACTIONS}/${transaction_id}`,
	DELETE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	EXPORT_MEETING_PRESENCE: (event_id: string) => `
		${BASE_PATH.MEETINGS}/files/${event_id}`,
	EXPORT_PARTICIPANTS_DATA: (event_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/files/${event_id}`,
	EXPORT_TRANSACTIONS_DATA: (event_id: string) =>
		`${BASE_PATH.TRANSACTIONS}/files/${event_id}`,
	EXPORT_VOLUNTEERS_DATA: (event_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/files/${event_id}`,

	// Dashboard
	GET_DASHBOARD: BASE_PATH.DASHBOARD,
	GET_DONATIONS: BASE_PATH.DONATIONS,
	GET_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	GET_EVENTS: BASE_PATH.EVENTS,
	GET_FUNCTIONS: `${BASE_PATH.VOLUNTEERS}/functions`,
	GET_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,
	GET_GROUP_BY_EVENT_ID: (event_id: string) =>
		`${BASE_PATH.GROUPS}/events/${event_id}`,
	GET_MEETING: (meeting_id: string) => `${BASE_PATH.MEETINGS}/${meeting_id}`,
	GET_MEETING_PRESENCE: (meeting_id: string) =>
		`${BASE_PATH.MEETINGS}/presence/${meeting_id}`,
	GET_MEETINGS_BY_EVENT_ID: (event_id: string) =>
		`${BASE_PATH.MEETINGS}/events/${event_id}`,
	GET_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	GET_PARTICIPANTS: BASE_PATH.PARTICIPANTS,
	GET_PARTICIPANTS_CITIES: `${BASE_PATH.PARTICIPANTS}/cities`,
	GET_PARTICIPANTS_PAYMENTS: `${BASE_PATH.PARTICIPANTS}/payments`,
	GET_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
	GET_ROOM_BY_EVENT_ID: (event_id: string) =>
		`${BASE_PATH.ROOMS}/events/${event_id}`,

	// Transactions
	GET_TRANSACTIONS: BASE_PATH.TRANSACTIONS,

	// Users
	GET_USERS: BASE_PATH.USERS,
	GET_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	GET_VOLUNTEERS: BASE_PATH.VOLUNTEERS,
	GET_VOLUNTEERS_CITIES: `${BASE_PATH.VOLUNTEERS}/cities`,
	GET_VOLUNTEERS_PAYMENTS: `${BASE_PATH.VOLUNTEERS}/payments`,
	RESET_USER_PASSWORD: (user_id: string) =>
		`${BASE_PATH.USERS}/${user_id}/reset`,
	RETURN_PARTICIPANT_PAYMENT: (payment_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/payments/${payment_id}`,
	RETURN_VOLUNTEER_PAYMENT: (payment_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/payments/${payment_id}`,
	UPDATE_CHECK_IN_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}/check-in`,
	UPDATE_CHECK_IN_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/check-in`,
	UPDATE_EVENT: (event_id: string) => `${BASE_PATH.EVENTS}/${event_id}`,
	UPDATE_FUNCTION: (function_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/functions/${function_id}`,
	UPDATE_GROUP: (group_id: string) => `${BASE_PATH.GROUPS}/group/${group_id}`,
	UPDATE_INTERESTED_EVENT: (event_id: string) =>
		`${BASE_PATH.EVENTS}/${event_id}/interested`,
	UPDATE_INTERESTED_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}/interested`,
	UPDATE_PARTICIPANT: (participant_id: string) =>
		`${BASE_PATH.PARTICIPANTS}/${participant_id}`,
	UPDATE_REGISTRATION_EVENT: (event_id: string) =>
		`${BASE_PATH.EVENTS}/${event_id}/registration`,
	UPDATE_ROOM: (room_id: string) => `${BASE_PATH.ROOMS}/room/${room_id}`,
	UPDATE_USER_PASSWORD: BASE_PATH.USERS,
	UPDATE_USER_ROLE: (user_id: string) => `${BASE_PATH.USERS}/${user_id}/role`,
	UPDATE_VOLUNTEER: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}`,
	UPDATE_VOLUNTEER_FUNCTION: (volunteer_id: string) =>
		`${BASE_PATH.VOLUNTEERS}/${volunteer_id}/function`,
}
