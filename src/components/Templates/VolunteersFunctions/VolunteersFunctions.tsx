'use client'

import { useState } from 'react'

import { ListManager } from '@/components/Molecules'
import {
	CreateVolunteerFunctionButton,
	FunctionDeleteModal,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetVolunteersFunctions } from '@/services/queries/volunteers/hooks/useGetVolunteersFunctions'
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
		overlayOpen(MODALS_IDS.REMOVE_FUNCTION_MODAL)
	}

	const formattedVolunteersFunctions = formatTableData(
		data,
		handleOpenModalToDeleteFunction,
	)
	return (
		<PageContent
			pageTitle="Funções voluntários"
			subheadingPage="Listagem das funções de voluntários"
			isLoading={isLoading}
		>
			<ListPage
				placeholderField="Encontrar uma função"
				className="lg:max-w-full"
				actionButton={<CreateVolunteerFunctionButton />}
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
				modalId={MODALS_IDS.REMOVE_FUNCTION_MODAL}
				selectedFunction={selectedFunction}
				setSelectedFunction={setSelectedFunction}
			/>
		</PageContent>
	)
}
