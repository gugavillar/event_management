'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { CHECK_IN_STATUS, LIMIT_PER_PAGE_EDITION, MEMBERS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { type UseGetInfinityParticipantsArgs, useGetInfinityParticipants } from '@/services/queries/participants'

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

	const baseParticipants = participants?.pages.flatMap((page) => page.data) ?? []

	const formattedParticipants = formatterComboBoxValues(baseParticipants, 'name', 'id')

	const lastItemRefParticipants = useInfiniteScrollObserver({
		fetchNextPage: fetchNextPageParticipants,
		hasNextPage: Boolean(hasNextPageParticipants),
		isFetchingNextPage: isFetchingNextPageParticipants,
	})
	return (
		<Controller
			control={control}
			key={`${fieldMemberName}-${MEMBERS.PARTICIPANT}`}
			name={fieldMemberName}
			render={({ field }) => (
				<SearchBox
					error={fieldError}
					keyOptionLabel="label"
					keyOptionValue="value"
					label="Membro"
					lastItemRef={lastItemRefParticipants}
					options={formattedParticipants}
					search={searchParticipant}
					selectedValue={field.value}
					setSearch={setSearchParticipant}
					setSelectedValue={field.onChange}
				/>
			)}
		/>
	)
}
