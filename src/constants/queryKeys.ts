import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	})

let browserQueryClient: QueryClient | undefined

export const QUERY_KEYS = {
	// Events
	EVENTS: 'events',
	EVENT: 'event',
	EVENTS_INFINITY: 'events-infinity',

	// Participants
	PARTICIPANTS_EXPORT_DATA: 'participants-export-data',
	PARTICIPANTS: 'participants',
	PARTICIPANT: 'participant',
	PARTICIPANTS_PAYMENT: 'payment-participants',
	PARTICIPANTS_INFINITY: 'participants-infinity',

	// Volunteers
	VOLUNTEERS_EXPORT_DATA: 'volunteers-export-data',
	VOLUNTEERS: 'volunteers',
	VOLUNTEER: 'volunteer',
	VOLUNTEERS_FUNCTIONS: 'volunteers-functions',
	VOLUNTEERS_PAYMENTS: 'payment-volunteers',
	VOLUNTEERS_INFINITY: 'volunteers-infinity',

	// Dashboard
	DASHBOARD: 'dashboard',

	// Users
	USERS: 'users',

	// Cities
	CITIES: 'cities',

	// Groups
	GROUPS: 'groups',
	GROUP: 'group',

	// Rooms
	ROOMS: 'rooms',
	ROOM: 'room',
} as const

export const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient()
	}
	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient()
	}
	return browserQueryClient
}
