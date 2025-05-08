'use client'
import { ComboBox } from '@/components/Molecules'
import {
	AgesChart,
	CitiesChart,
	DashboardCards,
	PageContent,
	PaymentsChart,
} from '@/components/Organisms'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetDashboardData } from '@/services/queries/dashboard'
import { useGetInfinityEvents } from '@/services/queries/events'

export const Dashboard = () => {
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data, eventId, setEventId, isLoading } = useGetDashboardData()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
	)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	return (
		<PageContent subheadingPage="Veja estatísticas totais ou apenas do evento selecionado">
			<ComboBox
				className="max-w-sm"
				keyOptionLabel="label"
				keyOptionValue="value"
				options={formattedEvents}
				selectedValue={eventId}
				setSelectedValue={setEventId}
				label="Selecione o evento"
				lastItemRef={lastItemRef}
			/>
			<DashboardCards isLoading={isLoading} data={data} />
			<CitiesChart
				categories={data?.participantsCities?.labels}
				series={data?.participantsCities?.data}
				isLoading={isLoading}
			/>
			<PaymentsChart
				categories={data?.paymentsTypes?.labels}
				series={data?.paymentsTypes?.data}
				isLoading={isLoading}
			/>
			<AgesChart
				categories={data?.ageRanges?.labels}
				series={data?.ageRanges?.data}
				isLoading={isLoading}
			/>
		</PageContent>
	)
}
