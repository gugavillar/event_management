import { ParticipantsPayments } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getPayments } from '@/services/queries/participants'

export default async function ParticipantsPaymentsPage({
	searchParams,
}: {
	searchParams: {
		searchParticipant: string
		eventId: string
		paymentType: string
		pageParticipantPayment: string
	}
}) {
	const debounceSearchValue = searchParams.searchParticipant ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debouncePaymentType = searchParams.paymentType ?? ''
	const page = generatePage(searchParams.pageParticipantPayment)

	const [getAllEvents, getAllPayments] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getPayments({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				paymentType: debouncePaymentType,
				page,
			}),
	])
	return (
		<HydrationProvider
			queryFn={getAllPayments}
			queryKey={[
				QUERY_KEYS.PAYMENT_PARTICIPANTS,
				debounceEventIdValue,
				debounceSearchValue,
				debouncePaymentType,
				page,
			]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS]}
				initialPageParam={1}
			>
				<ParticipantsPayments />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
