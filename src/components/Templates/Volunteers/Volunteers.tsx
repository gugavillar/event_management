'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Pagination } from '@/components/Atoms'
import { CreateVolunteerButton, ListManager } from '@/components/Molecules'
import {
	ExportVolunteersButton,
	FilterDrawer,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	VolunteerSchema,
	type VolunteerType,
} from '@/components/Organisms/VolunteerDrawer/VolunteerDrawer.schema'
import { MEMBERS, MODALS_IDS, overlayOpen } from '@/constants'
import { useGetVolunteers } from '@/services/queries/volunteers'
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { formatTableData, HEADER_LABELS } from './Volunteers.utils'

const AssignFunctionVolunteerModal = dynamic(() =>
	import('@/components/Organisms').then(
		(mod) => mod.AssignFunctionVolunteerModal
	)
)

const VolunteerCheckInModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerCheckInModal)
)

const VolunteerDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerDeleteModal)
)

const VolunteerDrawer = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerDrawer)
)

const VolunteerModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.VolunteerModalData)
)

export const Volunteers = () => {
	const [selectedVolunteer, setSelectedVolunteer] = useState<
		VolunteersAPI['id'] | null
	>(null)

	const {
		data: volunteers,
		isLoading,
		search,
		setSearch,
		page,
		setPage,
		query,
		setQuery,
	} = useGetVolunteers()

	const methods = useForm<VolunteerType>({
		defaultValues: {
			address: {
				city: '',
				neighborhood: '',
				number: '',
				state: '',
				street: '',
			},
			birthdate: '',
			called: '',
			cell: '',
			community: '',
			email: '',
			eventId: '',
			hasCell: '',
			hasHealth: '',
			health: '',
			name: '',
			phone: '',
			relative: '',
			relativePhone: '',
		},
		mode: 'onChange',
		resolver: zodResolver(VolunteerSchema),
	})

	const handleOpenModalToCheckInVolunteer = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_CHECK_IN_MODAL)
		},
		[]
	)

	const handleOpenModalToDeleteVolunteer = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_REMOVE_MODAL)
		},
		[]
	)

	const handleOpenModalToShowVolunteerData = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_MODAL_DATA)
		},
		[]
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
		[]
	)

	const handleOpenAssignFunctionVolunteerModal = useCallback(
		(id: VolunteersAPI['id']) => {
			setSelectedVolunteer(id)
			overlayOpen(MODALS_IDS.VOLUNTEER_ASSIGN_FUNCTION_MODAL)
		},
		[]
	)

	const formattedVolunteers = formatTableData(
		volunteers?.data,
		handleOpenModalToCheckInVolunteer,
		handleOpenModalToDeleteVolunteer,
		handleOpenDrawerToCreateOrEditVolunteer,
		handleOpenAssignFunctionVolunteerModal,
		handleOpenModalToShowVolunteerData
	)

	const hasMoreThanOnePage =
		!!volunteers?.totalPages && volunteers.totalPages > 1

	const handleCreateVolunteer = useCallback(
		() => handleOpenDrawerToCreateOrEditVolunteer(),
		[handleOpenDrawerToCreateOrEditVolunteer]
	)

	return (
		<PageContent pageTitle="Voluntários" subheadingPage="Lista de voluntários">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportVolunteersButton />
				<CreateVolunteerButton handleCreateVolunteer={handleCreateVolunteer} />
			</div>
			<ListPage
				className="lg:max-w-full"
				moreFilter={
					<FilterDrawer
						drawerId={MODALS_IDS.VOLUNTEER_FILTER_DRAWER}
						query={query}
						setQuery={setQuery}
						type={MEMBERS.VOLUNTEER}
					/>
				}
				placeholderField="Encontrar um voluntário"
				search={search}
				setSearch={setSearch}
			>
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
