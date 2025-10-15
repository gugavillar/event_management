import type { UUID } from 'crypto'

import { Groups } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationInfinityProvider } from '@/providers/HydrationInfinityProvider'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getEvents } from '@/services/queries/events'
import { getGroupByEventId } from '@/services/queries/groups'

type SearchParams = {
	searchParams: Promise<{
		groupEventId?: string
		searchMemberGroup?: string
	}>
}

export default async function GroupsPage({ searchParams }: SearchParams) {
	const params = await searchParams.then((res) => ({
		groupEventId: res.groupEventId ?? '',
		searchMemberGroup: res.searchMemberGroup ?? '',
	}))
	const eventId = params.groupEventId
	const searchMemberGroup = params.searchMemberGroup

	const getAllEvents = () => getEvents({ page: 1, searchEvent: '' })
	const getGroups = () => getGroupByEventId(eventId as UUID, searchMemberGroup)

	return (
		<HydrationInfinityProvider initialPageParam={1} queryFn={getAllEvents} queryKey={[QUERY_KEYS.EVENTS_INFINITY, '']}>
			<HydrationProvider queryFn={getGroups} queryKey={[QUERY_KEYS.GROUPS, eventId]}>
				<Groups eventId={eventId} />
			</HydrationProvider>
		</HydrationInfinityProvider>
	)
}
