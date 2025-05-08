'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Select } from '@/components/Atoms'
import {
	ComboBox,
	ImportVolunteersButton,
	ListManager,
} from '@/components/Molecules'
import {
	AssignFunctionVolunteerModal,
	DownloadTemplateVolunteersButton,
	ListPage,
	PageContent,
	VolunteerCheckInModal,
	VolunteerDeleteModal,
	VolunteerDrawer,
} from '@/components/Organisms'
import {
	VolunteerSchema,
	VolunteerType,
} from '@/components/Organisms/VolunteerDrawer/VolunteerDrawer.schema'
import { MODALS_IDS, overlayOpen, StatusSelectOptions } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetVolunteers } from '@/services/queries/volunteers'
import { VolunteersFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './Volunteers.utils'

export const Volunteers = () => {
	const [selectedVolunteer, setSelectedVolunteer] = useState<
		VolunteersFromAPI['id'] | null
	>(null)

	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		data,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
		status,
		setStatus,
	} = useGetVolunteers()

	const methods = useForm<VolunteerType>({
		defaultValues: {
			name: '',
			email: '',
			called: '',
			birthdate: '',
			contact: '',
			maritalStatus: '',
			city: '',
			neighborhood: '',
			number: '',
			street: '',
			parent: '',
			contactParent: '',
			relationship: '',
			state: '',
		},
		resolver: zodResolver(VolunteerSchema),
	})

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

	const handleOpenModalToCheckInVolunteer = async (
		id: VolunteersFromAPI['id'],
	) => {
		setSelectedVolunteer(id)
		overlayOpen(MODALS_IDS.VOLUNTEER_CHECK_IN_MODAL)
	}

	const handleOpenModalToDeleteVolunteer = async (
		id: VolunteersFromAPI['id'],
	) => {
		setSelectedVolunteer(id)
		overlayOpen(MODALS_IDS.VOLUNTEER_REMOVE_MODAL)
	}

	const handleOpenDrawerToEditVolunteer = async (
		id: VolunteersFromAPI['id'],
	) => {
		setSelectedVolunteer(id)
		overlayOpen(MODALS_IDS.VOLUNTEER_EDIT_DRAWER)
	}

	const handleOpenAssignFunctionVolunteerModal = async (
		id: VolunteersFromAPI['id'],
	) => {
		setSelectedVolunteer(id)
		overlayOpen(MODALS_IDS.VOLUNTEER_ASSIGN_FUNCTION_MODAL)
	}

	const formattedVolunteers = formatTableData(
		data,
		handleOpenModalToCheckInVolunteer,
		handleOpenModalToDeleteVolunteer,
		handleOpenDrawerToEditVolunteer,
		handleOpenAssignFunctionVolunteerModal,
	)

	return (
		<PageContent
			pageTitle="Voluntários"
			subheadingPage="Lista de voluntários"
			isLoading={isLoading}
		>
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadTemplateVolunteersButton />
				<ImportVolunteersButton
					label="Importar voluntários"
					modalId={MODALS_IDS.VOLUNTEER_IMPORT_MODAL}
				/>
			</div>
			<ListPage
				placeholderField="Encontrar um voluntário"
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
					bodyData={formattedVolunteers}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
			</ListPage>
			<VolunteerCheckInModal
				modalId={MODALS_IDS.VOLUNTEER_CHECK_IN_MODAL}
				selectedVolunteer={selectedVolunteer}
				setSelectedVolunteer={setSelectedVolunteer}
			/>
			<VolunteerDeleteModal
				modalId={MODALS_IDS.VOLUNTEER_REMOVE_MODAL}
				selectedVolunteer={selectedVolunteer}
				setSelectedVolunteer={setSelectedVolunteer}
			/>
			<FormProvider {...methods}>
				<VolunteerDrawer
					drawerId={MODALS_IDS.VOLUNTEER_EDIT_DRAWER}
					selectedVolunteer={selectedVolunteer}
					setSelectedVolunteer={setSelectedVolunteer}
				/>
			</FormProvider>
			<AssignFunctionVolunteerModal
				modalId={MODALS_IDS.VOLUNTEER_ASSIGN_FUNCTION_MODAL}
				selectedVolunteer={selectedVolunteer}
				setSelectedVolunteer={setSelectedVolunteer}
			/>
		</PageContent>
	)
}
