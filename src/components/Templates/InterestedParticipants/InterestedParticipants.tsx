'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	ExportParticipantsButton,
	FilterDrawer,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MEMBERS, MODALS_IDS, overlayOpen } from '@/constants'
import { useGetParticipants } from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './InterestedParticipants.utils'

const ParticipantModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantModalData),
)

const InterestedModalToParticipant = dynamic(() =>
	import('@/components/Organisms').then(
		(mod) => mod.InterestedModalToParticipant,
	),
)

const ParticipantDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantDeleteModal),
)

export const InterestedParticipants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<
		null | ParticipantsAPI['id']
	>(null)
	const {
		data: participants,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
		query,
		setQuery,
	} = useGetParticipants(true)

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

	const handleOpenModalToDeleteParticipant = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectedParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_REMOVE_MODAL)
		},
		[],
	)

	const formattedInterestedParticipants = formatTableData(
		participants?.data,
		handleOpenModalToShowParticipantData,
		handleOpenModalInterestedParticipant,
		handleOpenModalToDeleteParticipant,
	)

	const hasMoreThanOnePage =
		!!participants?.totalPages && participants.totalPages > 1

	return (
		<PageContent
			subheadingPage="Lista de participantes interessados"
			pageTitle="Participantes interessados"
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportParticipantsButton isInterested />
			</div>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<FilterDrawer
						drawerId={MODALS_IDS.PARTICIPANT_FILTER_INTERESTED_DRAWER}
						query={query}
						setQuery={setQuery}
						type={MEMBERS.PARTICIPANT}
						isInterestedList
					/>
				}
			>
				<ListManager
					bodyData={formattedInterestedParticipants}
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
			<ParticipantModalData
				modalId={MODALS_IDS.PARTICIPANT_MODAL_DATA}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
			<InterestedModalToParticipant
				modalId={MODALS_IDS.PARTICIPANT_INTERESTED_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
				interested={false}
			/>
			<ParticipantDeleteModal
				modalId={MODALS_IDS.PARTICIPANT_REMOVE_MODAL}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
		</PageContent>
	)
}
