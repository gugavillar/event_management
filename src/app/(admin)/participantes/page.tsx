import { Participants } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'

export default async function ParticipantsPage() {
	const getAllEvents = async () => getEvents({ search: '' })

	return (
		<HydrationProvider
			queryFn={getAllEvents}
			queryKey={[QUERY_KEYS.EVENTS, '']}
		>
			<Participants />
		</HydrationProvider>
	)
}
