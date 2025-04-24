import { VolunteersFunctions } from '@/components/Templates'
import { QUERY_KEYS } from '@/constants'
import { HydrationProvider } from '@/providers/HydrationProver'
import { getVolunteersFunctions } from '@/services/queries/volunteers'

export default async function VolunteersFunctionsPage({
	searchParams,
}: {
	searchParams: { searchFunction: string }
}) {
	const debounceValue = searchParams.searchFunction ?? ''
	const getAllFunctions = async () =>
		getVolunteersFunctions({ searchFunction: debounceValue })
	return (
		<HydrationProvider
			queryFn={getAllFunctions}
			queryKey={[QUERY_KEYS.VOLUNTEERS_FUNCTIONS, debounceValue]}
		>
			<VolunteersFunctions />
		</HydrationProvider>
	)
}
