import { ParticipantsPayments } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getPayments } from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		paymentType?: string
		pageParticipantPayment?: string
	}>
}

export default async function ParticipantsPaymentsPage({
	searchParams,
}: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchParticipant: res.searchParticipant ?? '',
		eventId: res.eventId ?? '',
		paymentType: res.paymentType ?? '',
		pageParticipantPayment: res.pageParticipantPayment ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debouncePaymentType = params.paymentType
	const page = generatePage(params.pageParticipantPayment)

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
				QUERY_KEYS.PARTICIPANTS_PAYMENT,
				debounceEventIdValue,
				debounceSearchValue,
				debouncePaymentType,
				page,
			]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
				initialPageParam={1}
			>
				<ParticipantsPayments />
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
