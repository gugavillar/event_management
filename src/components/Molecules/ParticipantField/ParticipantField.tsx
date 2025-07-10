'use client'
import { Controller, useFormContext } from 'react-hook-form'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE_EDITION, MEMBERS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import {
	useGetInfinityParticipants,
	UseGetInfinityParticipantsArgs,
} from '@/services/queries/participants'

import { SearchBox } from '../SearchBox'

type ParticipantFieldProps = UseGetInfinityParticipantsArgs & {
	fieldMemberName: string
	fieldError: string | undefined
	isEdition?: boolean
}

export const ParticipantField = ({
	eventId,
	fieldError,
	fieldMemberName,
	hasNoGroup,
	hasNoRoom,
	isEdition,
}: ParticipantFieldProps) => {
	const { control } = useFormContext()
	const {
		data: participants,
		fetchNextPage: fetchNextPageParticipants,
		hasNextPage: hasNextPageParticipants,
		isFetchingNextPage: isFetchingNextPageParticipants,
		searchParticipant,
		setSearchParticipant,
	} = useGetInfinityParticipants({
		eventId,
		hasNoGroup,
		hasNoRoom,
		statusParticipant: CHECK_IN_STATUS.CONFIRMED,
		...(isEdition && { limit: LIMIT_PER_PAGE_EDITION }),
	})

	const baseParticipants =
		participants?.pages.flatMap((page) => page.data) ?? []

	const formattedParticipants = formatterComboBoxValues(
		baseParticipants,
		'name',
		'id',
	)

	const lastItemRefParticipants = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPageParticipants),
		isFetchingNextPage: isFetchingNextPageParticipants,
		fetchNextPage: fetchNextPageParticipants,
	})
	return (
		<Controller
			key={`${fieldMemberName}-${MEMBERS.PARTICIPANT}`}
			name={fieldMemberName}
			control={control}
			render={({ field }) => (
				<SearchBox
					search={searchParticipant}
					setSearch={setSearchParticipant}
					label="Membro"
					keyOptionLabel="label"
					keyOptionValue="value"
					options={formattedParticipants}
					selectedValue={field.value}
					setSelectedValue={field.onChange}
					lastItemRef={lastItemRefParticipants}
					error={fieldError}
				/>
			)}
		/>
	)
}
