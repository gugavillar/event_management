import { VolunteersPayments } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getPayments } from '@/services/queries/volunteers'

export default async function VolunteersPaymentsPage({
	searchParams,
}: {
	searchParams: {
		searchVolunteer: string
		eventId: string
		paymentType: string
	}
}) {
	const debounceSearchValue = searchParams.searchVolunteer ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debouncePaymentType = searchParams.paymentType ?? ''
	const [getAllEvents, getAllVolunteers] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getPayments({
				searchVolunteer: debounceSearchValue,
				eventId: debounceEventIdValue,
				paymentType: debouncePaymentType,
			}),
	])
	return (
		<HydrationProvider
			queryFn={getAllVolunteers}
			queryKey={[
				QUERY_KEYS.PAYMENT_VOLUNTEERS,
				debounceEventIdValue,
				debounceSearchValue,
				debouncePaymentType,
			]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS]}
				initialPageParam={1}
			>
				<VolunteersPayments />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
