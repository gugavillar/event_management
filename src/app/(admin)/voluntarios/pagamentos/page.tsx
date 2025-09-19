import { VolunteersPayments } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getPayments, getVolunteersCities } from '@/services/queries/volunteers'

type SearchParams = {
	searchParams: Promise<{
		searchVolunteer?: string
		eventId?: string
		paymentType?: string
		pageVolunteerPayment?: string
		cityVolunteer?: string
	}>
}

export default async function VolunteersPaymentsPage({
	searchParams,
}: SearchParams) {
	const params = await searchParams.then((res) => ({
		searchVolunteer: res.searchVolunteer ?? '',
		eventId: res.eventId ?? '',
		paymentType: res.paymentType ?? '',
		pageVolunteerPayment: res.pageVolunteerPayment ?? '',
		cityVolunteer: res.cityVolunteer ?? '',
	}))
	const debounceSearchValue = params.searchVolunteer
	const debounceEventIdValue = params.eventId
	const debounceCityValue = params.cityVolunteer
	const debouncePaymentType = params.paymentType
	const page = generatePage(params.pageVolunteerPayment)

	const getAllEvents = () => getEvents({ searchEvent: '', page: 1 })
	const getAllPayments = () =>
		getPayments({
			searchVolunteer: debounceSearchValue,
			eventId: debounceEventIdValue,
			paymentType: debouncePaymentType,
			volunteerCity: debounceCityValue,
			page,
		})
	const getCities = () => getVolunteersCities(debounceEventIdValue)

	return (
		<HydrationProvider
			queryFn={getAllPayments}
			queryKey={[
				QUERY_KEYS.VOLUNTEERS_PAYMENTS,
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
					queryKey={[QUERY_KEYS.VOLUNTEERS_CITIES, debounceEventIdValue]}
				>
					<VolunteersPayments />
				</HydrationProvider>
			</HydrationInfinityProvider>
		</HydrationProvider>
	)
}
