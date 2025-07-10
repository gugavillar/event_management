'use client'
import { Controller, useFormContext } from 'react-hook-form'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE_EDITION, MEMBERS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import {
	useGetInfinityVolunteers,
	UseGetInfinityVolunteersArgs,
} from '@/services/queries/volunteers'

import { SearchBox } from '../SearchBox'

type VolunteerFieldProps = UseGetInfinityVolunteersArgs & {
	fieldMemberName: string
	fieldError: string | undefined
	isEdition?: boolean
}

export const VolunteerField = ({
	eventId,
	fieldMemberName,
	hasNoGroup,
	hasNoRoom,
	fieldError,
	isEdition,
}: VolunteerFieldProps) => {
	const { control } = useFormContext()
	const {
		data: volunteers,
		fetchNextPage: fetchNextPageVolunteers,
		hasNextPage: hasNextPageVolunteers,
		isFetchingNextPage: isFetchingNextPageVolunteers,
		searchVolunteer,
		setSearchVolunteer,
	} = useGetInfinityVolunteers({
		eventId,
		hasNoGroup,
		hasNoRoom,
		statusVolunteer: CHECK_IN_STATUS.CONFIRMED,
		...(isEdition && { limit: LIMIT_PER_PAGE_EDITION }),
	})

	const baseVolunteers = volunteers?.pages.flatMap((page) => page.data) ?? []

	const formattedVolunteers = formatterComboBoxValues(
		baseVolunteers,
		'name',
		'id',
	)

	const lastItemRefVolunteers = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPageVolunteers),
		isFetchingNextPage: isFetchingNextPageVolunteers,
		fetchNextPage: fetchNextPageVolunteers,
	})

	return (
		<Controller
			key={`${fieldMemberName}-${MEMBERS.VOLUNTEER}`}
			name={fieldMemberName}
			control={control}
			render={({ field }) => (
				<SearchBox
					search={searchVolunteer}
					setSearch={setSearchVolunteer}
					label="Membro"
					keyOptionLabel="label"
					keyOptionValue="value"
					options={formattedVolunteers}
					selectedValue={field.value}
					setSelectedValue={field.onChange}
					lastItemRef={lastItemRefVolunteers}
					error={fieldError}
				/>
			)}
		/>
	)
}
