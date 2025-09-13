'use client'
import { Filter } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	Label,
} from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { MEMBERS, overlayClose } from '@/constants'
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
	status: '',
	city: '',
	role: '',
	paymentType: '',
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
		status: query.status,
		city: query.city,
		role: query.role,
		paymentType: query.paymentType,
	})
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)
	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
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

	const filterCount = filterEventId
		? Object.values(filters).filter((value) => !!value).length + 1
		: Object.values(filters).filter((value) => !!value).length

	const isInterested = type === MEMBERS.PARTICIPANT && isInterestedList

	return (
		<>
			<Button
				type="button"
				data-hs-overlay={`#${drawerId}`}
				leftIcon={<Filter />}
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
			>
				Filtros
				{filterCount > 0 && (
					<span className="inline-flex items-center rounded-full bg-teal-800 px-1.5 py-0.5 text-xs font-medium text-white">
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
							options={formattedEvents}
							selectedValue={filterEventId}
							setSelectedValue={setFilterEventId}
							lastItemRef={lastItemRef}
						/>
					</div>
					{type === MEMBERS.PARTICIPANT ? (
						<ParticipantFilters
							eventId={filterEventId}
							filters={filters}
							handleFilter={handleFilter}
							isPaymentType={isPaymentType}
							isInterested={isInterested}
						/>
					) : (
						<VolunteerFilters
							eventId={filterEventId}
							handleFilter={handleFilter}
							filters={filters}
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
