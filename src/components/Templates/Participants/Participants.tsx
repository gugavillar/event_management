'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Pagination, Select } from '@/components/Atoms'
import {
	ComboBox,
	ImportParticipantsButton,
	ListManager,
} from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	DownloadTemplateParticipantsButton,
	ParticipantDeleteModal,
	ParticipantCheckInModal,
	ParticipantDrawer,
	ParticipantModalData,
} from '@/components/Organisms'
import {
	ParticipantSchema,
	ParticipantType,
} from '@/components/Organisms/ParticipantDrawer/ParticipantDrawer.schema'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetParticipants } from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './Participants.utils'

export const Participants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<
		null | ParticipantsAPI['id']
	>(null)

	const methods = useForm<ParticipantType>({
		defaultValues: {
			name: '',
			email: '',
			called: '',
			birthdate: '',
			phone: '',
			responsible: '',
			responsiblePhone: '',
			host: '',
			hostPhone: '',
			hasReligion: undefined,
			religion: '',
			hasHealth: undefined,
			health: '',
			address: {
				city: '',
				neighborhood: '',
				number: '',
				street: '',
				state: '',
			},
		},
		resolver: zodResolver(ParticipantSchema),
	})
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
		status,
		setStatus,
		page,
		setPage,
	} = useGetParticipants()

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

	const handleOpenModalToDeleteParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_REMOVE_MODAL)
		},
		[],
	)

	const handleOpenModalToCheckInParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_CHECK_IN_MODAL)
		},
		[],
	)

	const handleOpenDrawerToEditParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_EDIT_DRAWER)
		},
		[],
	)

	const handleOpenModalToShowParticipantData = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_MODAL_DATA)
		},
		[],
	)

	const formattedParticipants = formatTableData(
		participants?.data,
		handleOpenModalToDeleteParticipant,
		handleOpenModalToCheckInParticipant,
		handleOpenDrawerToEditParticipant,
		handleOpenModalToShowParticipantData,
	)

	const hasMoreThanOnePage =
		!!participants?.totalPages && participants.totalPages > 1

	return (
		<PageContent
			subheadingPage="Lista de participantes"
			pageTitle="Participantes"
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateParticipantsButton />
				<ImportParticipantsButton
					label="Importar participantes"
					modalId={MODALS_IDS.PARTICIPANT_IMPORT_MODAL}
				/>
			</div>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
						/>
						<Select
							placeholder="Selecione o status"
							options={StatusSelectOptions}
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedParticipants}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						totalPages={participants?.totalPages}
						setPage={setPage}
					/>
				)}
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
			<FormProvider {...methods}>
				<ParticipantDrawer
					drawerId={MODALS_IDS.PARTICIPANT_EDIT_DRAWER}
					selectedParticipant={selectedParticipant}
					setSelectedParticipant={setSelectedParticipant}
				/>
			</FormProvider>
			<ParticipantModalData
				modalId={MODALS_IDS.PARTICIPANT_MODAL_DATA}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
		</PageContent>
	)
}
