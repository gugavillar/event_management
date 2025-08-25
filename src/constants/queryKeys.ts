import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: true,
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
	PARTICIPANTS_PAYMENTS: 'payment-participants',
	PARTICIPANTS_INFINITY: 'participants-infinity',
	PARTICIPANTS_CITIES: 'participants-cities',

	// Volunteers
	VOLUNTEERS_EXPORT_DATA: 'volunteers-export-data',
	VOLUNTEERS: 'volunteers',
	VOLUNTEER: 'volunteer',
	VOLUNTEERS_FUNCTIONS: 'volunteers-functions',
	VOLUNTEERS_PAYMENTS: 'payment-volunteers',
	VOLUNTEERS_INFINITY: 'volunteers-infinity',
	VOLUNTEERS_CITIES: 'volunteers-cities',

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

	// Meetings
	MEETINGS: 'meetings',
	MEETING: 'meeting',
	MEETINGS_EXPORT_DATA: 'meetings-export-data',

	// Donations
	DONATIONS: 'donations',

	// Transactions
	TRANSACTIONS: 'transactions',
	TRANSACTIONS_EXPORT_DATA: 'transactions-export-data',
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
