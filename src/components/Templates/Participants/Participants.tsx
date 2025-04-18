'use client'

import { useState } from 'react'

import { Select } from '@/components/Atoms'
import { ImportParticipantsButton, ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	DownloadTemplateParticipantsButton,
	ParticipantDeleteModal,
	ParticipantCheckInModal,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useTooltip } from '@/hooks'
import { useGetEvents } from '@/services/queries/events'
import { useGetParticipants } from '@/services/queries/participants'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './Participants.utils'

export const Participants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<
		null | ParticipantsFromAPI['id']
	>(null)

	const { data: events } = useGetEvents()
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
	} = useGetParticipants()
	useTooltip(Boolean(selectedParticipant))

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const handleOpenModalToDeleteParticipant = async (
		id: ParticipantsFromAPI['id'],
	) => {
		setSelectedParticipant(id)
		overlayOpen(MODALS_IDS.PARTICIPANT_REMOVE_MODAL)
	}

	const handleOpenModalToCheckInParticipant = async (
		id: ParticipantsFromAPI['id'],
	) => {
		setSelectedParticipant(id)
		overlayOpen(MODALS_IDS.PARTICIPANT_CHECK_IN_MODAL)
	}

	const formattedParticipants = formatTableData(
		participants,
		handleOpenModalToDeleteParticipant,
		handleOpenModalToCheckInParticipant,
	)

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
			<ParticipantDeleteModal
				modalId={MODALS_IDS.PARTICIPANT_REMOVE_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
			<ParticipantCheckInModal
				modalId={MODALS_IDS.PARTICIPANT_CHECK_IN_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
		</PageContent>
	)
}
