'use client'

import { UUID } from 'crypto'

import { Button, Select } from '@/components/Atoms'
import { ImportButton, ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	ImportFileModal,
	DownloadTemplateParticipantsButton,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'
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

	const handleClickRow = async ({ id }: { id: UUID }) => {
		console.log(id)
		overlayOpen(MODALS_IDS.PARTICIPANT_DRAWER)
	}

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const formattedParticipants = formatTableData(participants ?? [])

	return (
		<PageContent
			subheadingPage="Listagem de participantes"
			isLoading={isLoading}
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateParticipantsButton />
				<ImportButton
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
					handleClickRow={handleClickRow}
					bodyData={formattedParticipants}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
					drawerId={MODALS_IDS.PARTICIPANT_DRAWER}
					drawerTitle="Dados do participante"
					drawerFooter={
						<>
							<Button className="w-full justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-gray-800">
								Cancelar participação
							</Button>
							<Button className="w-full justify-center bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-gray-800">
								Confirmar participação
							</Button>
						</>
					}
					drawerContent={
						<>
							{/* <PersonalInfoCard userInfo={MOCKED_USER} />
							<AddressInfoCard addressInfo={MOCKED_USER.address} />
							{MOCKED_USER.responsible.length ? (
								<FamilyContactInfo responsibleInfo={MOCKED_USER.responsible} />
							) : null}
							{MOCKED_USER.healthInfo ? (
								<HealthInfoCard healthInfo={MOCKED_USER.healthInfo} />
							) : null} */}
						</>
					}
				/>
			</ListPage>
			<ImportFileModal modalId={MODALS_IDS.IMPORT_PARTICIPANTS_MODAL} />
		</PageContent>
	)
}
