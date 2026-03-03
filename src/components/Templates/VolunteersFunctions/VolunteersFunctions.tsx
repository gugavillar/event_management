'use client'

import { Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { CreateVolunteerFunctionButton, ListPage, PageContent } from '@/components/Organisms'
import { VOLUNTEER_MODAL_TYPE } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetFunctions } from '@/services/queries/volunteers'
import type { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { Content, formatTableData } from './VolunteersFunctions.utils'

export type SelectedFunction = {
	modal: VOLUNTEER_MODAL_TYPE
	function: VolunteersFunctionsFromAPI | null
}

const FunctionDeleteModal = dynamic(() => import('@/components/Organisms').then((mod) => mod.FunctionDeleteModal))

export const VolunteersFunctions = () => {
	const [selectedFunction, setSelectedFunction] = useState<null | SelectedFunction>(null)
	const { data, isLoading, search, setSearch, eventId, setEventId } = useGetFunctions()
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()

	const handleOpenModalToDeleteFunction = useCallback((selected: VolunteersFunctionsFromAPI) => {
		setSelectedFunction({ function: selected, modal: VOLUNTEER_MODAL_TYPE.DELETE_FUNCTION })
	}, [])

	const handleOpenModalToEditFunction = useCallback((selected: VolunteersFunctionsFromAPI) => {
		setSelectedFunction({ function: selected, modal: VOLUNTEER_MODAL_TYPE.CREATE_OR_EDIT_FUNCTION })
	}, [])

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const formattedVolunteersFunctions = formatTableData(
		data,
		handleOpenModalToDeleteFunction,
		handleOpenModalToEditFunction
	)
	return (
		<PageContent pageTitle="Funções" subheadingPage="Lista das funções">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<CreateVolunteerFunctionButton selectedFunction={selectedFunction} setSelectedFunction={setSelectedFunction} />
			</div>
			<ListPage
				className="w-full flex-col md:flex-row lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							lastItemRef={lastItemRef}
							options={formattedEvents}
							placeholder="Selecione um evento"
							selectedValue={eventId}
							setSelectedValue={setEventId}
						/>
						<Field
							className="ps-11"
							disabled={!eventId}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Encontrar função"
							rightIcon={<Search size={24} />}
							value={search}
						/>
					</>
				}
			>
				{Content(eventId, isLoading, formattedVolunteersFunctions)}
			</ListPage>
			<FunctionDeleteModal selectedFunction={selectedFunction} setSelectedFunction={setSelectedFunction} />
		</PageContent>
	)
}
