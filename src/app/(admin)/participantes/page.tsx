import { Participants } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getParticipants } from '@/services/queries/participants'

export default async function ParticipantsPage({
	searchParams,
}: {
	searchParams: {
		search: string
		eventId: string
	}
}) {
	const debounceSearchValue = searchParams.search ?? ''
	const debounceEventIdValue = searchParams.eventId ?? ''
	const [getAllEvents, getAllParticipants] = await Promise.all([
		async () => getEvents({ search: debounceEventIdValue }),
		async () => getParticipants({ eventId: debounceSearchValue }),
	])

	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, debounceEventIdValue]}
		>
			<HydrationProvider
				queryFn={getAllParticipants}
				queryKey={[
					QUERY_KEYS.PARTICIPANTS,
					debounceEventIdValue,
					debounceSearchValue,
				]}
			>
				<Participants />
			</HydrationProvider>
		</HydrationProvider>
	)
}
