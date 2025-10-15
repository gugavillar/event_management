import { ParticipantsPayments } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipantsCities, getPayments } from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		searchParticipant?: string
		eventId?: string
		paymentType?: string
		pageParticipantPayment?: string
		cityParticipant?: string
	}>
}

export default async function ParticipantsPaymentsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		cityParticipant: res.cityParticipant ?? '',
		eventId: res.eventId ?? '',
		pageParticipantPayment: res.pageParticipantPayment ?? '',
		paymentType: res.paymentType ?? '',
		searchParticipant: res.searchParticipant ?? '',
	}))
	const debounceSearchValue = params.searchParticipant
	const debounceEventIdValue = params.eventId
	const debouncePaymentType = params.paymentType
	const debounceCityValue = params.cityParticipant
	const page = generatePage(params.pageParticipantPayment)

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getAllPayments = () =>
		getPayments({
			eventId: debounceEventIdValue,
			page,
			participantCity: debounceCityValue,
			paymentType: debouncePaymentType,
			searchParticipant: debounceSearchValue,
		})
	const getCities = () => getParticipantsCities(false, debounceEventIdValue)

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
				initialPageParam={1}
				queryFn={getAllEvents}
				queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}
			>
				<HydrationProvider
					queryFn={getCities}
					queryKey={[QUERY_KEYS.PARTICIPANTS_CITIES, undefined, debounceEventIdValue]}
				>
					<ParticipantsPayments />
				</HydrationProvider>
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
