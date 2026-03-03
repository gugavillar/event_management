'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ExportParticipantsButton, FilterDrawer, ListPage, PageContent } from '@/components/Organisms'
import { MEMBERS, MODALS_IDS, PARTICIPANT_MODAL_TYPE } from '@/constants'
import { useGetParticipants } from '@/services/queries/participants'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import type { SelectedParticipant } from '../Participants'
import { formatTableData, HEADER_LABELS } from './InterestedParticipants.utils'

const ParticipantModalData = dynamic(() => import('@/components/Organisms').then((mod) => mod.ParticipantModalData))

const InterestedModalToParticipant = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.InterestedModalToParticipant)
)

const ParticipantDeleteModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.ParticipantDeleteModal))

export const InterestedParticipants = () => {
	const [selectedParticipant, setSelectedParticipant] = useState<null | SelectedParticipant>(null)
	const { data: participants, isLoading, search, setSearch, page, setPage, query, setQuery } = useGetParticipants(true)

	const handleOpenModalToShowParticipantData = useCallback((id: ParticipantsAPI['id']) => {
		setSelectedParticipant({ id, modal: PARTICIPANT_MODAL_TYPE.INFO })
	}, [])

	const handleOpenModalInterestedParticipant = useCallback((id: ParticipantsAPI['id']) => {
		setSelectedParticipant({ id, modal: PARTICIPANT_MODAL_TYPE.INTERESTED })
	}, [])

	const handleOpenModalToDeleteParticipant = useCallback((id: ParticipantsAPI['id']) => {
		setSelectedParticipant({ id, modal: PARTICIPANT_MODAL_TYPE.DELETE })
	}, [])

	const formattedInterestedParticipants = formatTableData(
		participants?.data,
		handleOpenModalToShowParticipantData,
		handleOpenModalInterestedParticipant,
		handleOpenModalToDeleteParticipant
	)

	const hasMoreThanOnePage = !!participants?.totalPages && participants.totalPages > 1

	return (
		<PageContent pageTitle="Participantes interessados" subheadingPage="Lista de participantes interessados">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportParticipantsButton isInterested />
			</div>
			<ListPage
				className="lg:max-w-full"
				moreFilter={
					<FilterDrawer
						drawerId={MODALS_IDS.PARTICIPANT_FILTER_INTERESTED_DRAWER}
						isInterestedList
						query={query}
						setQuery={setQuery}
						type={MEMBERS.PARTICIPANT}
					/>
				}
				placeholderField="Encontrar um participante"
				search={search}
				setSearch={setSearch}
			>
				<ListManager bodyData={formattedInterestedParticipants} headerLabels={HEADER_LABELS} isLoading={isLoading} />
				{hasMoreThanOnePage && (
					<Pagination currentPage={page} setPage={setPage} totalPages={participants?.totalPages} />
				)}
			</ListPage>
			<ParticipantModalData selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant} />
			<InterestedModalToParticipant
				interested={false}
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
			<ParticipantDeleteModal
				selectedParticipant={selectedParticipant}
				setSelectedParticipant={setSelectedParticipant}
			/>
		</PageContent>
	)
}
