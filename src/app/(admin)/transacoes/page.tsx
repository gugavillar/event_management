import { PageContent } from '@/components/Organisms'
import { Transaction } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { getEvents } from '@/services/queries/events'

export default async function PaymentsPage() {
	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<PageContent pageTitle="Transações" subheadingPage="Prestação de contas">
				<Transaction />
			</PageContent>
		</HydrationInfinityProvider>
	)
}
