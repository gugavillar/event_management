'use client'
import { Filter } from 'lucide-react'
import { useState } from 'react'

import { Button, Drawer, DrawerBody, DrawerFooter, Label } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { MEMBERS, overlayClose, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

import { ParticipantFilters } from './ParticipantFilters'
import { VolunteerFilters } from './VolunteerFilters'

type FilterDrawerProps = {
	drawerId: string
	type: MEMBERS.PARTICIPANT | MEMBERS.VOLUNTEER
	query: any
	setQuery: any
	isPaymentType?: boolean
	isInterestedList?: boolean
}

export type FilterType = {
	status: string
	city: string
	role: string
	paymentType: string
}

const defaultFilters: FilterType = {
	city: '',
	paymentType: '',
	role: '',
	status: '',
}

export const FilterDrawer = ({
	drawerId,
	type,
	query,
	setQuery,
	isPaymentType,
	isInterestedList,
}: FilterDrawerProps) => {
	const [filterEventId, setFilterEventId] = useState(query.eventId)
	const [filters, setFilters] = useState<FilterType>({
		city: query.city,
		paymentType: query.paymentType,
		role: query.role,
		status: query.status,
	})
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos'
	)
	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const handleFilter = (name: keyof FilterType, value: string) => {
		setFilters({
			...filters,
			[name]: value,
		})
	}

	const handleApplyFilters = () => {
		setQuery((prev: any) => ({ ...prev, ...filters, eventId: filterEventId }))
		overlayClose(drawerId)
	}

	const handleClearFilters = () => {
		setQuery({ ...defaultFilters, eventId: '' })
		setFilters(defaultFilters)
		setFilterEventId('')
		overlayClose(drawerId)
	}

	const handleOpenDrawerFilters = () => {
		overlayOpen(drawerId)
	}

	const filterCount = filterEventId
		? Object.values(filters).filter((value) => !!value).length + 1
		: Object.values(filters).filter((value) => !!value).length

	const isInterested = type === MEMBERS.PARTICIPANT && isInterestedList

	return (
		<>
			<Button
				className="relative items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:min-w-60"
				leftIcon={<Filter />}
				onClick={handleOpenDrawerFilters}
				type="button"
			>
				<span className="max-md:hidden">Filtros</span>
				{filterCount > 0 && (
					<span className="items-center rounded-full bg-teal-800 px-1.5 py-0.5 text-xs font-medium text-white max-sm:absolute max-sm:-top-2 max-sm:right-0 md:inline-flex">
						{filterCount}
					</span>
				)}
			</Button>
			<Drawer drawerId={drawerId} headingTitle="Filtros">
				<DrawerBody>
					<div className="w-full">
						<Label>Evento</Label>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							lastItemRef={lastItemRef}
							options={formattedEvents}
							selectedValue={filterEventId}
							setSelectedValue={setFilterEventId}
						/>
					</div>
					{type === MEMBERS.PARTICIPANT ? (
						<ParticipantFilters
							eventId={filterEventId}
							filters={filters}
							handleFilter={handleFilter}
							isInterested={isInterested}
							isPaymentType={isPaymentType}
						/>
					) : (
						<VolunteerFilters
							eventId={filterEventId}
							filters={filters}
							handleFilter={handleFilter}
							isPaymentType={isPaymentType}
						/>
					)}
				</DrawerBody>
				<DrawerFooter>
					<Button
						className="w-full items-center justify-center text-base transition-colors duration-500 hover:bg-gray-200"
						onClick={handleClearFilters}
					>
						Limpar
					</Button>
					<Button
						className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						onClick={handleApplyFilters}
					>
						Filtrar
					</Button>
				</DrawerFooter>
			</Drawer>
		</>
	)
}
