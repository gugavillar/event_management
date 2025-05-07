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
import { useGetDashboardData } from '@/services/queries/dashboard'
import { useGetEvents } from '@/services/queries/events'

export const Dashboard = () => {
	const { data: events } = useGetEvents()
	const { data, eventId, setEventId, isLoading } = useGetDashboardData()

	const formattedEvents = formatterComboBoxValues(events, 'name', 'id', true)

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
