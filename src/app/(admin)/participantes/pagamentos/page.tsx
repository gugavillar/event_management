import { ParticipantsPayments } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import {
	getParticipantsCities,
	getPayments,
} from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		paymentType?: string
		pageParticipantPayment?: string
		cityParticipant?: string
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
		cityParticipant: res.cityParticipant ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debouncePaymentType = params.paymentType
	const debounceCityValue = params.cityParticipant
	const page = generatePage(params.pageParticipantPayment)

	const [getAllEvents, getAllPayments, getCities] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getPayments({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				paymentType: debouncePaymentType,
				participantCity: debounceCityValue,
				page,
			}),
		async () => getParticipantsCities(),
	])
	return (
		<HydrationProvider
			queryFn={getAllPayments}
			queryKey={[
				QUERY_KEYS.PARTICIPANTS_PAYMENTS,
				debounceEventIdValue,
				debounceSearchValue,
				debouncePaymentType,
				debounceCityValue,
				page,
			]}
		>
			<HydrationInfinityProvider
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
				initialPageParam={1}
			>
				<HydrationProvider
					queryFn={getCities}
					queryKey={[QUERY_KEYS.PARTICIPANTS_CITIES]}
				>
					<ParticipantsPayments />
				</HydrationProvider>
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
