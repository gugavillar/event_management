import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	})

let browserQueryClient: QueryClient | undefined

export const QUERY_KEYS = {
	// Events
	EVENTS: 'events',
	EVENT: 'event',

	// Participants
	PARTICIPANTS_TEMPLATE_FILE: 'participants-template-file',
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
