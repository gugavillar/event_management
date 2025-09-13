'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Pagination } from '@/components/Atoms'
import { CreateParticipantButton, ListManager } from '@/components/Molecules'
import {
	ExportParticipantsButton,
	FilterDrawer,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	ParticipantSchema,
	ParticipantType,
} from '@/components/Organisms/ParticipantDrawer/ParticipantDrawer.schema'
import { MEMBERS, MODALS_IDS, overlayOpen } from '@/constants'
import { useGetParticipants } from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './Participants.utils'

const ParticipantCheckInModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantCheckInModal),
)

const ParticipantModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantModalData),
)

const ParticipantDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantDeleteModal),
)

const ParticipantDrawer = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantDrawer),
)

const InterestedModalToParticipant = dynamic(() =>
	import('@/components/Organisms').then(
		(mod) => mod.InterestedModalToParticipant,
	),
)

export const Participants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<
		null | ParticipantsAPI['id']
	>(null)

	const methods = useForm<ParticipantType>({
		mode: 'onChange',
		defaultValues: {
			eventId: '',
			name: '',
			email: '',
			called: '',
			birthdate: '',
			phone: '',
			responsible: '',
			responsiblePhone: '',
			host: '',
			hostPhone: '',
			hasReligion: '',
			religion: '',
			hasHealth: '',
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
		data: participants,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
		query,
		setQuery,
	} = useGetParticipants()

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

	const handleOpenDrawerToCreateOrEditParticipant = useCallback(
		(id?: ParticipantsAPI['id']) => {
			if (id) {
				setSelectedParticipant(id)
			} else {
				setSelectedParticipant(null)
			}
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

	const handleOpenModalInterestedParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_INTERESTED_MODAL)
		},
		[],
	)

	const formattedParticipants = formatTableData(
		participants?.data,
		handleOpenModalToDeleteParticipant,
		handleOpenModalToCheckInParticipant,
		handleOpenDrawerToCreateOrEditParticipant,
		handleOpenModalToShowParticipantData,
		handleOpenModalInterestedParticipant,
	)

	const hasMoreThanOnePage =
		!!participants?.totalPages && participants.totalPages > 1

	const handleCreateParticipant = useCallback(
		() => handleOpenDrawerToCreateOrEditParticipant(),
		[handleOpenDrawerToCreateOrEditParticipant],
	)

	return (
		<PageContent
			subheadingPage="Lista de participantes"
			pageTitle="Participantes"
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportParticipantsButton />
				<CreateParticipantButton
					handleCreateParticipant={handleCreateParticipant}
				/>
			</div>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<FilterDrawer
						drawerId={MODALS_IDS.PARTICIPANT_FILTER_DRAWER}
						type={MEMBERS.PARTICIPANT}
						query={query}
						setQuery={setQuery}
					/>
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
			<InterestedModalToParticipant
				modalId={MODALS_IDS.PARTICIPANT_INTERESTED_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
				interested={true}
			/>
		</PageContent>
	)
}
