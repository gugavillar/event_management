import { ParticipantsPayments } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
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
	}
}) {
	const debounceSearchValue = searchParams.searchParticipant ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debouncePaymentType = searchParams.paymentType ?? ''
	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ searchEvent: '' }),
		async () =>
			getPayments({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				paymentType: debouncePaymentType,
			}),
	])
	return (
		<HydrationProvider
			queryFn={getAllParticipants}
			queryKey={[
				QUERY_KEYS.PAYMENT_PARTICIPANTS,
				debounceEventIdValue,
				debounceSearchValue,
				debouncePaymentType,
			]}
		>
			<HydrationProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS, '']}
			>
				<ParticipantsPayments />
			</HydrationProvider>
		</HydrationProvider>
	)
}
