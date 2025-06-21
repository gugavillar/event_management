'use client'
import { Controller, useFormContext } from 'react-hook-form'

import { MEMBERS } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import {
	useGetInfinityParticipants,
	UseGetInfinityParticipantsArgs,
	useGetParticipant,
} from '@/services/queries/participants'

import { SearchBox } from '../SearchBox'

type ParticipantFieldProps = UseGetInfinityParticipantsArgs & {
	fieldMemberName: string
	fieldError: string | undefined
}

export const ParticipantField = ({
	eventId,
	fieldError,
	fieldMemberName,
	hasNoGroup,
	hasNoRoom,
}: ParticipantFieldProps) => {
	const { control, watch } = useFormContext()
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
	})

	const baseParticipants =
		participants?.pages.flatMap((page) => page.data) ?? []

	const selectedParticipantId = watch(fieldMemberName)

	const { data: selectedParticipant } = useGetParticipant(selectedParticipantId)

	const allParticipants = [...baseParticipants]

	if (
		selectedParticipant &&
		!baseParticipants.some(
			(participant) => participant.id === selectedParticipant.id,
		)
	) {
		allParticipants.push(selectedParticipant)
	}

	const formattedParticipants = formatterComboBoxValues(
		allParticipants,
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
