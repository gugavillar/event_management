import { isServer, QueryClient } from '@tanstack/react-query'

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				retry: false,
			},
		},
	})

let browserQueryClient: QueryClient | undefined

export const QUERY_KEYS = {
	EVENTS: 'events',
	EVENT: 'event',
	PARTICIPANTS_TEMPLATE_FILE: 'participants-template-file',
	PARTICIPANTS: 'participants',
	PARTICIPANT: 'participant',
	PAYMENT_PARTICIPANTS: 'payment-participants',
	VOLUNTEERS_TEMPLATE_FILE: 'volunteers-template-file',
	VOLUNTEERS: 'volunteers',
	VOLUNTEER: 'volunteer',
	VOLUNTEERS_FUNCTIONS: 'volunteers-functions',
	PAYMENT_VOLUNTEERS: 'payment-volunteers',
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
