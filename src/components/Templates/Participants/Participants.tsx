'use client'

import { Select } from '@/components/Atoms'
import { ImportParticipantsButton, ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	DownloadTemplateParticipantsButton,
} from '@/components/Organisms'
import { MODALS_IDS, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useGetParticipants } from '@/services/queries/participants'

import { formatTableData, HEADER_LABELS } from './Participants.utils'

export const Participants = () => {
	const { data: events } = useGetEvents()
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
	} = useGetParticipants()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const formattedParticipants = formatTableData(participants ?? [])

	return (
		<PageContent
			subheadingPage="Listagem de participantes"
			isLoading={isLoading}
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateParticipantsButton />
				<ImportParticipantsButton
					label="Importar participantes"
					modalId={MODALS_IDS.IMPORT_PARTICIPANTS_MODAL}
				/>
			</div>
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
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedParticipants}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
		</PageContent>
	)
}
