'use client'

import { Select } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { CollaboratorTypeSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useGetParticipants } from '@/services/queries/participants'
import { useGetVolunteers } from '@/services/queries/volunteers'

import { formatTableData, HEADER_LABELS } from './Payments.utils'

export const Payments = () => {
	const { data: events } = useGetEvents()
	const { data: participants, isLoading: isLoadingParticipants } =
		useGetParticipants()
	const { data: volunteers, isLoading: isLoadingVolunteers } =
		useGetVolunteers()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const formattedData = formatTableData(participants, volunteers)

	return (
		<PageContent subheadingPage="Listagem de colaboradores do evento">
			<ListPage
				placeholderField="Encontrar um colaborador"
				className="lg:max-w-full"
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
							// value={eventId}
							// onChange={(e) => setEventId(e.target.value)}
						/>
						<Select
							placeholder="Selecione o tipo do colaborador"
							options={CollaboratorTypeSelectOptions}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedData}
					headerLabels={HEADER_LABELS}
					// handleClickRow={handleClickRow}
					isLoading={isLoadingVolunteers || isLoadingParticipants}
				/>
			</ListPage>
		</PageContent>
	)
}
