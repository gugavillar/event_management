'use client'

import { Select } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useGetParticipants } from '@/services/queries/participants'

import { formatTableData, HEADER_LABELS } from './ParticipantsPayments.utils'

export const ParticipantsPayments = () => {
	const { data: events } = useGetEvents()
	const {
		data: participants,
		isLoading: isLoadingParticipants,
		search,
		setSearch,
		setEventId,
		eventId,
	} = useGetParticipants()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const formattedData = formatTableData(participants)

	return (
		<PageContent
			pageTitle="Lista de pagamentos participantes"
			subheadingPage="Listagem de pagamento dos participantes"
			isLoading={isLoadingParticipants}
		>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
							value={eventId}
							onChange={(e) => setEventId(e.target.value)}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedData}
					headerLabels={HEADER_LABELS}
					// handleClickRow={handleClickRow}
					isLoading={isLoadingParticipants}
				/>
			</ListPage>
		</PageContent>
	)
}
