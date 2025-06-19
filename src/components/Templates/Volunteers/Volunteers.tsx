'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Pagination, Select } from '@/components/Atoms'
import {
	ComboBox,
	CreateVolunteerButton,
	ListManager,
} from '@/components/Molecules'
import {
	ExportVolunteersButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	VolunteerSchema,
	VolunteerType,
} from '@/components/Organisms/VolunteerDrawer/VolunteerDrawer.schema'
import {
	MODALS_IDS,
	NO_FUNCTION,
	overlayOpen,
	StatusSelectOptions,
} from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useGetFunctions,
	useGetVolunteers,
} from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './Volunteers.utils'

const AssignFunctionVolunteerModal = dynamic(() =>
	import('@/components/Organisms').then(
		(mod) => mod.AssignFunctionVolunteerModal,
	),
)

const VolunteerCheckInModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerCheckInModal),
)

const VolunteerDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerDeleteModal),
)

const VolunteerDrawer = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerDrawer),
)

const VolunteerModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerModalData),
)

export const Volunteers = () => {
	const [selectedVolunteer, setSelectedVolunteer] = useState<
		VolunteersAPI['id'] | null
	>(null)

	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		data: volunteers,
		isLoading,
		search,
		setSearch,
		setEventId,
		eventId,
		status,
		setStatus,
		role,
		setRole,
		page,
		setPage,
	} = useGetVolunteers()
	const { data: roles } = useGetFunctions(eventId)

	const methods = useForm<VolunteerType>({
		defaultValues: {
			eventId: '',
			name: '',
			email: '',
			called: '',
			birthdate: '',
			community: '',
			phone: '',
			relative: '',
			relativePhone: '',
			hasCell: '',
			cell: '',
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
		resolver: zodResolver(VolunteerSchema),
	})

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)

	const formattedRoles = roles?.map((role) => ({
		label: role.volunteerRole.role,
		value: role.volunteerRole.role,
	}))
	formattedRoles?.unshift(NO_FUNCTION)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleOpenModalToCheckInVolunteer = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_CHECK_IN_MODAL)
		},
		[],
	)

	const handleOpenModalToDeleteVolunteer = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_REMOVE_MODAL)
		},
		[],
	)

	const handleOpenModalToShowVolunteerData = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_MODAL_DATA)
		},
		[],
	)

	const handleOpenDrawerToCreateOrEditVolunteer = useCallback(
		(id?: VolunteersAPI['id']) => {
			if (id) {
				setSelectedVolunteer(id)
			} else {
				setSelectedVolunteer(null)
			}
			overlayOpen(MODALS_IDS.VOLUNTEER_EDIT_DRAWER)
		},
		[],
	)

	const handleOpenAssignFunctionVolunteerModal = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_ASSIGN_FUNCTION_MODAL)
		},
		[],
	)

	const formattedVolunteers = formatTableData(
		volunteers?.data,
		handleOpenModalToCheckInVolunteer,
		handleOpenModalToDeleteVolunteer,
		handleOpenDrawerToCreateOrEditVolunteer,
		handleOpenAssignFunctionVolunteerModal,
		handleOpenModalToShowVolunteerData,
	)

	const hasMoreThanOnePage =
		!!volunteers?.totalPages && volunteers.totalPages > 1

	return (
		<PageContent pageTitle="Voluntários" subheadingPage="Lista de voluntários">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<CreateVolunteerButton
					handleCreateVolunteer={() =>
						handleOpenDrawerToCreateOrEditVolunteer()
					}
				/>
				<ExportVolunteersButton />
			</div>
			<ListPage
				placeholderField="Encontrar um voluntário"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<ComboBox
						keyOptionLabel="label"
						keyOptionValue="value"
						options={formattedEvents}
						selectedValue={eventId}
						setSelectedValue={setEventId}
						lastItemRef={lastItemRef}
					/>
				}
			>
				<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
					<Select
						placeholder="Selecione o status"
						options={StatusSelectOptions}
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					/>
					<Select
						disabled={!eventId}
						placeholder="Selecione a função"
						options={formattedRoles ?? []}
						value={role}
						onChange={(e) => setRole(e.target.value)}
					/>
				</div>
				<ListManager
					bodyData={formattedVolunteers}
					headerLabels={HEADER_LABELS}
					isLoading={isLoading}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						setPage={setPage}
						totalPages={volunteers?.totalPages}
					/>
				)}
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
			<VolunteerModalData
				modalId={MODALS_IDS.VOLUNTEER_MODAL_DATA}
				selectedVolunteer={selectedVolunteer}
				setSelectedVolunteer={setSelectedVolunteer}
			/>
		</PageContent>
	)
}
