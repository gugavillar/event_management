import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

vi.mock('nuqs', () => {
	const createParserMock = () => ({
		withDefault: vi.fn().mockReturnThis(),
	})

	return {
		parseAsInteger: createParserMock(),
		parseAsString: createParserMock(),

		useQueryState: () => {
			const [value, setValue] = useState<any>(null)

			return [
				value,
				(newValue: any) => {
					setValue(newValue)
				},
			]
		},

		useQueryStates: () => {
			const [state, setState] = useState({})
			return [state, setState]
		},
	}
})

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
