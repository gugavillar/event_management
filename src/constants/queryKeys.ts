import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: true,
				retry: false,
				staleTime: 60 * 1000,
			},
		},
	})

let browserQueryClient: QueryClient | undefined

export const QUERY_KEYS = {
	// Cities
	CITIES: 'cities',

	// Dashboard
	DASHBOARD: 'dashboard',

	// Donations
	DONATIONS: 'donations',
	EVENT: 'event',
	// Events
	EVENTS: 'events',
	EVENTS_INFINITY: 'events-infinity',
	GROUP: 'group',

	// Groups
	GROUPS: 'groups',
	MEETING: 'meeting',

	// Meetings
	MEETINGS: 'meetings',
	MEETINGS_EXPORT_DATA: 'meetings-export-data',
	PARTICIPANT: 'participant',
	PARTICIPANTS: 'participants',
	PARTICIPANTS_CITIES: 'participants-cities',

	// Participants
	PARTICIPANTS_EXPORT_DATA: 'participants-export-data',
	PARTICIPANTS_INFINITY: 'participants-infinity',
	PARTICIPANTS_PAYMENTS: 'payment-participants',
	ROOM: 'room',

	// Rooms
	ROOMS: 'rooms',

	// Transactions
	TRANSACTIONS: 'transactions',
	TRANSACTIONS_EXPORT_DATA: 'transactions-export-data',

	// Users
	USERS: 'users',
	VOLUNTEER: 'volunteer',
	VOLUNTEERS: 'volunteers',
	VOLUNTEERS_CITIES: 'volunteers-cities',

	// Volunteers
	VOLUNTEERS_EXPORT_DATA: 'volunteers-export-data',
	VOLUNTEERS_FUNCTIONS: 'volunteers-functions',
	VOLUNTEERS_INFINITY: 'volunteers-infinity',
	VOLUNTEERS_PAYMENTS: 'payment-volunteers',
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
