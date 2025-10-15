'use client'

import { Header, Table } from '@/components/Atoms'
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
import { DownloadPDF } from './BirthdayPeoplePrint'
import { CardInfo } from './CardInfo'
import { formatTableData, HEADERS_LABELS } from './Dashboard.utils'

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
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const formattedBirthdayPeople = formatTableData(data?.birthdayPeople ?? [])

	return (
		<PageContent subheadingPage="Veja estatísticas totais ou apenas do evento selecionado">
			<ComboBox
				className="max-w-sm"
				keyOptionLabel="label"
				keyOptionValue="value"
				label="Selecione o evento"
				lastItemRef={lastItemRef}
				options={formattedEvents}
				selectedValue={eventId}
				setSelectedValue={setEventId}
			/>
			{!eventId ? (
				<CardInfo />
			) : (
				<>
					<DashboardCards data={data} isLoading={isLoading} />
					<CitiesChart
						categories={data?.participantsCities?.labels}
						isLoading={isLoading}
						series={[{ data: data?.participantsCities?.data ?? [] }]}
					/>
					<PaymentsChart
						categories={data?.paymentsTypes?.labels}
						isLoading={isLoading}
						series={data?.paymentsTypes.data}
					/>
					<AgesChart
						categories={data?.ageRanges?.labels}
						isLoading={isLoading}
						series={data?.ageRanges.data}
					/>
					<div className="space-y-4">
						<div className="flex flex-col items-center justify-between space-y-4 md:flex-row">
							<Header>Aniversariantes do evento</Header>
							<DownloadPDF birthdayPeople={formattedBirthdayPeople} />
						</div>
						<Table
							bodyData={formattedBirthdayPeople}
							headerLabels={HEADERS_LABELS}
							isLoading={isLoading}
						/>
					</div>
				</>
			)}
		</PageContent>
	)
}
