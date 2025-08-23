import { PageContent } from '@/components/Organisms'
import { Payment } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { getEvents } from '@/services/queries/events'

export default async function PaymentsPage() {
	const [getAllEvents] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			initialPageParam={1}
		>
			<PageContent title="Pagamentos" subheadingPage="Prestação de contas">
				<Payment />
			</PageContent>
		</HydrationInfinityProvider>
	)
}
