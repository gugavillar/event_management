'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { ListManager } from '@/components/Molecules'
import {
	CreateVolunteerFunctionButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { useGetFunctions } from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './VolunteersFunctions.utils'

const FunctionDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.FunctionDeleteModal),
)

export const VolunteersFunctions = () => {
	const [selectedFunction, setSelectedFunction] =
		useState<null | VolunteersFunctionsFromAPI>(null)
	const { data, isLoading, search, setSearch } = useGetFunctions()

	const handleOpenModalToDeleteFunction = useCallback(
		(selected: VolunteersFunctionsFromAPI) => {
			setSelectedFunction(selected)
			overlayOpen(MODALS_IDS.FUNCTION_REMOVE_MODAL)
		},
		[],
	)

	const handleOpenModalToEditFunction = useCallback(
		(selected: VolunteersFunctionsFromAPI) => {
			setSelectedFunction(selected)
			overlayOpen(MODALS_IDS.FUNCTION_CREATE_OR_UPDATE_MODAL)
		},
		[],
	)

	const formattedVolunteersFunctions = formatTableData(
		data,
		handleOpenModalToDeleteFunction,
		handleOpenModalToEditFunction,
	)
	return (
		<PageContent pageTitle="Funções" subheadingPage="Lista das funções">
			<ListPage
				placeholderField="Encontrar uma função"
				className="lg:max-w-full"
				actionButton={
					<CreateVolunteerFunctionButton
						selectedFunction={selectedFunction}
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
		</PageContent>
	)
}
