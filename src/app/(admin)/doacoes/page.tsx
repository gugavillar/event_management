import { Donation } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getDonations } from '@/services/queries/donations'
import { getEvents } from '@/services/queries/events'

type SearchParams = {
	searchParams: Promise<{
		eventId?: string
		pageDonation?: string
	}>
}

export default async function DonationPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		eventId: res.eventId ?? '',
		page: res.pageDonation ?? '',
	}))
	const debounceValue = params.eventId
	const page = generatePage(params.page)

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getAllDonations = async () => getDonations({ eventId: debounceValue, page })

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider queryFn={getAllDonations} queryKey={[QUERY_KEYS.DONATIONS, debounceValue, page]}>
				<Donation />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
