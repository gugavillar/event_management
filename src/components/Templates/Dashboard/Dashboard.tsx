'use client'
import { Select } from '@/components/Atoms'
import {
	AgesChart,
	CitiesChart,
	DashboardCards,
	PageContent,
	PaymentsChart,
} from '@/components/Organisms'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetDashboardData } from '@/services/queries/dashboard'
import { useGetEvents } from '@/services/queries/events'

export const Dashboard = () => {
	const { data: events } = useGetEvents()
	const { data, eventId, setEventId, isLoading } = useGetDashboardData()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	return (
		<PageContent subheadingPage="Veja estatísticas totais ou apenas do evento selecionado">
			<Select
				placeholder="Selecione o evento"
				className="max-w-sm"
				options={formattedEvents}
				value={eventId}
				onChange={(e) => setEventId(e.target.value)}
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
