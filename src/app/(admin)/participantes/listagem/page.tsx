import { Participants } from '@/components/Templates'
import { generatePage, QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants } from '@/services/queries/participants'

export default async function ParticipantsPage({
	searchParams,
}: {
	searchParams: {
		searchParticipant: string
		eventId: string
		statusParticipant: string
		pageParticipant: string
	}
}) {
	const debounceSearchValue = searchParams.searchParticipant ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const debounceStatusValue = searchParams.statusParticipant ?? ''
	const page = generatePage(searchParams.pageParticipant)

	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ searchEvent: '', page: 1 }),
		async () =>
			getParticipants({
				searchParticipant: debounceSearchValue,
				eventId: debounceEventIdValue,
				statusParticipant: debounceStatusValue,
				page,
			}),
	])

	return (
		<HydrationInfinityProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
			initialPageParam={1}
		>
			<HydrationProvider
				queryFn={getAllParticipants}
				queryKey={[
					QUERY_KEYS.PARTICIPANTS,
					debounceEventIdValue,
					debounceSearchValue,
					debounceStatusValue,
					page,
				]}
			>
				<Participants />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
