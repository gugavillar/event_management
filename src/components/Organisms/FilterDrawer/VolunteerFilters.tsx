'use client'

import { useEffect } from 'react'

import { Label, Select } from '@/components/Atoms'
import {
	NO_FUNCTION,
	PaymentSelectOptions,
	StatusSelectOptions,
} from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import {
	useGetFunctions,
	useGetVolunteersCities,
} from '@/services/queries/volunteers'

import { FilterType } from './FilterDrawer'

type VolunteerFiltersProps = {
	eventId: string
	handleFilter: (name: keyof FilterType, value: string) => void
	filters: FilterType
	isPaymentType?: boolean
}

export const VolunteerFilters = ({
	eventId,
	handleFilter,
	filters,
	isPaymentType,
}: VolunteerFiltersProps) => {
	const { data: volunteersCities } = useGetVolunteersCities({ eventId })
	const { data: roles } = useGetFunctions(eventId)

	const formattedRoles = roles?.map((role) => ({
		label: role.volunteerRole.role,
		value: role.volunteerRole.role,
	}))
	formattedRoles?.unshift(NO_FUNCTION)

	const formattedCities = formatterFieldSelectValues(
		volunteersCities,
		'city',
		'city',
	)
	formattedCities.unshift({ label: 'Todas as cidades', value: '' })

	useEffect(() => {
		if (!eventId) {
			handleFilter('role', '')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId])

	return (
		<>
			{isPaymentType ? (
				<div className="w-full">
					<Label>Tipo de pagamento</Label>
					<Select
						placeholder="Selecione o tipo de pagamento"
						options={PaymentSelectOptions}
						value={filters.paymentType}
						onChange={(e) => handleFilter('paymentType', e.target.value)}
					/>
				</div>
			) : (
				<div className="w-full">
					<Label>Status</Label>
					<Select
						placeholder="Selecione o status"
						options={StatusSelectOptions}
						value={filters.status}
						onChange={(e) => handleFilter('status', e.target.value)}
					/>
				</div>
			)}
			<div className="w-full">
				<Label>Cidade</Label>
				<Select
					options={formattedCities}
					value={filters.city}
					onChange={(e) => handleFilter('city', e.target.value)}
				/>
			</div>
			{!isPaymentType && (
				<div className="w-full">
					<Label>Função</Label>
					<Select
						disabled={!eventId}
						placeholder="Selecione a função"
						options={formattedRoles ?? []}
						value={filters.role}
						onChange={(e) => handleFilter('role', e.target.value)}
					/>
				</div>
			)}
		</>
	)
}
