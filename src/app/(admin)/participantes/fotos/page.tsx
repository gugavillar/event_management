import { Pictures } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants, getParticipantsCities } from '@/services/queries/participants'

type SearchParams = {
	searchParams: Promise<{
		eventId?: string
		city?: string
		searchParticipant?: string
		pageParticipant?: string
	}>
}

export default async function PicturesPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		city: res.city ?? '',
		eventId: res.eventId ?? '',
		page: res.pageParticipant ?? '',
		searchParticipant: res.searchParticipant ?? '',
	}))

	const eventId = params.eventId
	const city = params.city
	const searchParticipant = params.searchParticipant
	const page = generatePage(params.page)

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getCities = () => getParticipantsCities(false, eventId)
	const getAllParticipants = () =>
		getParticipants({
			eventId: eventId,
			page,
			participantCity: city,
			searchParticipant: searchParticipant,
		})

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider queryFn={getCities} queryKey={[QUERY_KEYS.PARTICIPANTS_CITIES, undefined, eventId]}>
				<HydrationProvider
					queryFn={getAllParticipants}
					queryKey={[QUERY_KEYS.PARTICIPANTS, eventId, searchParticipant, undefined, city, undefined, page]}
				>
					<Pictures paramsEventId={eventId} />
				</HydrationProvider>
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
