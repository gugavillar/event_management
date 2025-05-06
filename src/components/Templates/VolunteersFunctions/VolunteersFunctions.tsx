'use client'

import { useState } from 'react'

import { ListManager } from '@/components/Molecules'
import {
	CreateVolunteerFunctionButton,
	CreateVolunteerFunctionModal,
	FunctionDeleteModal,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetVolunteersFunctions } from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './VolunteersFunctions.utils'

export const VolunteersFunctions = () => {
	const [selectedFunction, setSelectedFunction] =
		useState<null | VolunteersFunctionsFromAPI>(null)
	const { data, isLoading, search, setSearch } = useGetVolunteersFunctions()

	const handleOpenModalToDeleteFunction = (
		selected: VolunteersFunctionsFromAPI,
	) => {
		setSelectedFunction(selected)
		overlayOpen(MODALS_IDS.FUNCTION_REMOVE_MODAL)
	}

	const handleOpenModalToEditFunction = (
		selected: VolunteersFunctionsFromAPI,
	) => {
		setSelectedFunction(selected)
		overlayOpen(MODALS_IDS.FUNCTION_CREATE_OR_UPDATE_MODAL)
	}

	const formattedVolunteersFunctions = formatTableData(
		data,
		handleOpenModalToDeleteFunction,
		handleOpenModalToEditFunction,
	)
	return (
		<PageContent
			pageTitle="Lista das funções"
			subheadingPage="Listagem das funções de voluntários"
			isLoading={isLoading}
		>
			<ListPage
				placeholderField="Encontrar uma função"
				className="lg:max-w-full"
				actionButton={
					<CreateVolunteerFunctionButton
						modalId={MODALS_IDS.FUNCTION_CREATE_OR_UPDATE_MODAL}
						setSelectedFunction={setSelectedFunction}
					/>
				}
				search={search}
				setSearch={setSearch}
			>
				<ListManager
					bodyData={formattedVolunteersFunctions}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
			<FunctionDeleteModal
				modalId={MODALS_IDS.FUNCTION_REMOVE_MODAL}
				selectedFunction={selectedFunction}
				setSelectedFunction={setSelectedFunction}
			/>
			<CreateVolunteerFunctionModal
				modalId={MODALS_IDS.FUNCTION_CREATE_OR_UPDATE_MODAL}
				selectedFunction={selectedFunction}
				setSelectedFunction={setSelectedFunction}
			/>
		</PageContent>
	)
}
