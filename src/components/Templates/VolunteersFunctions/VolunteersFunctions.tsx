'use client'

import { Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import {
	CreateVolunteerFunctionButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetFunctions } from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { Content, formatTableData } from './VolunteersFunctions.utils'

const FunctionDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.FunctionDeleteModal),
)

export const VolunteersFunctions = () => {
	const [selectedFunction, setSelectedFunction] =
		useState<null | VolunteersFunctionsFromAPI>(null)
	const { data, isLoading, search, setSearch, eventId, setEventId } =
		useGetFunctions()
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

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

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const formattedVolunteersFunctions = formatTableData(
		data,
		handleOpenModalToDeleteFunction,
		handleOpenModalToEditFunction,
	)
	return (
		<PageContent pageTitle="Funções" subheadingPage="Lista das funções">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<CreateVolunteerFunctionButton
					selectedFunction={selectedFunction}
					modalId={MODALS_IDS.FUNCTION_CREATE_OR_UPDATE_MODAL}
					setSelectedFunction={setSelectedFunction}
				/>
			</div>
			<ListPage
				className="w-full flex-col md:flex-row lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
							placeholder="Selecione um evento"
						/>
						<Field
							placeholder="Encontrar função"
							rightIcon={<Search size={24} />}
							className="ps-11"
							value={search}
							disabled={!eventId}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</>
				}
			>
				{Content(eventId, isLoading, formattedVolunteersFunctions)}
			</ListPage>
			<FunctionDeleteModal
				modalId={MODALS_IDS.FUNCTION_REMOVE_MODAL}
				selectedFunction={selectedFunction}
				setSelectedFunction={setSelectedFunction}
			/>
		</PageContent>
	)
}
