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

	// Participants
	PARTICIPANTS_EXPORT_DATA: 'participants-template-file',
	PARTICIPANTS: 'participants',
	PARTICIPANT: 'participant',
	PAYMENT_PARTICIPANTS: 'payment-participants',

	// Volunteers
	VOLUNTEERS_TEMPLATE_FILE: 'volunteers-template-file',
	VOLUNTEERS: 'volunteers',
	VOLUNTEER: 'volunteer',
	VOLUNTEERS_FUNCTIONS: 'volunteers-functions',
	PAYMENT_VOLUNTEERS: 'payment-volunteers',

	// Dashboard
	DASHBOARD: 'dashboard',

	// Users
	USERS: 'users',

	// Cities
	CITIES: 'cities',
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
