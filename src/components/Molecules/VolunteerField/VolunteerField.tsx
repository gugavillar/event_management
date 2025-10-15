'use client'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE_EDITION, MEMBERS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import {
	type UseGetInfinityVolunteersArgs,
	useGetInfinityVolunteers,
} from '@/services/queries/volunteers'
import { Controller, useFormContext } from 'react-hook-form'
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
		'id'
	)

	const lastItemRefVolunteers = useInfiniteScrollObserver({
		fetchNextPage: fetchNextPageVolunteers,
		hasNextPage: Boolean(hasNextPageVolunteers),
		isFetchingNextPage: isFetchingNextPageVolunteers,
	})

	return (
		<Controller
			control={control}
			key={`${fieldMemberName}-${MEMBERS.VOLUNTEER}`}
			name={fieldMemberName}
			render={({ field }) => (
				<SearchBox
					error={fieldError}
					keyOptionLabel="label"
					keyOptionValue="value"
					label="Membro"
					lastItemRef={lastItemRefVolunteers}
					options={formattedVolunteers}
					search={searchVolunteer}
					selectedValue={field.value}
					setSearch={setSearchVolunteer}
					setSelectedValue={field.onChange}
				/>
			)}
		/>
	)
}
