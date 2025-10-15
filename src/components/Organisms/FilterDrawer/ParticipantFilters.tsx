import { Label, Select } from '@/components/Atoms'
import { PaymentSelectOptions, StatusSelectOptions } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetParticipantsCities } from '@/services/queries/participants'

import type { FilterType } from './FilterDrawer'

type ParticipantFiltersProps = {
	eventId: string
	filters: FilterType
	handleFilter: (name: keyof FilterType, value: string) => void
	isPaymentType?: boolean
	isInterested?: boolean
}

export const ParticipantFilters = ({
	filters,
	eventId,
	handleFilter,
	isPaymentType,
	isInterested,
}: ParticipantFiltersProps) => {
	const { data: participantsCities } = useGetParticipantsCities({
		eventId,
		isInterested,
	})
	const formattedCities = formatterFieldSelectValues(participantsCities, 'city', 'city')
	formattedCities.unshift({
		label: 'Todos as cidades',
		value: '',
	})

	return (
		<>
			{isPaymentType ? (
				<div className="w-full">
					<Label>Tipo de pagamento</Label>
					<Select
						onChange={(e) => handleFilter('paymentType', e.target.value)}
						options={PaymentSelectOptions}
						placeholder="Selecione o tipo de pagamento"
						value={filters.paymentType}
					/>
				</div>
			) : (
				!isInterested && (
					<div className="w-full">
						<Label>Status</Label>
						<Select
							onChange={(e) => handleFilter('status', e.target.value)}
							options={StatusSelectOptions}
							placeholder="Selecione o status"
							value={filters.status}
						/>
					</div>
				)
			)}
			<div className="w-full">
				<Label>Cidade</Label>
				<Select onChange={(e) => handleFilter('city', e.target.value)} options={formattedCities} value={filters.city} />
			</div>
		</>
	)
}
