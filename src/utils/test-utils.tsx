import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

vi.mock('nuqs', () => ({
	parseAsInteger: { withDefault: vi.fn() },
	parseAsString: { withDefault: vi.fn() },
	useQueryState: vi.fn(() => [null, vi.fn()]),
	useQueryStates: vi.fn(() => [{}, vi.fn()]),
}))

vi.mock('nuqs/adapters/next/app', () => ({
	NuqsAdapter: ({ children }: { children: React.ReactNode }) => children,
}))

import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const createWrapper = (queryClient?: QueryClient) => {
	const client = queryClient ?? new QueryClient()

	return ({ children }: { children: ReactNode }) => (
		<NuqsAdapter>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</NuqsAdapter>
	)
}
