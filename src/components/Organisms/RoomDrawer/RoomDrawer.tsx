'use client'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import {
	Controller,
	type SubmitHandler,
	useFieldArray,
	useFormContext,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	FieldArrayContainerWithAppendButton,
	ComboBox,
	RadioField,
	SearchBox,
	MaskedInputField,
} from '@/components/Molecules'
import { MEMBERS, MembersTypesOptionsRadio, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetInfinityParticipants } from '@/services/queries/participants'
import {
	useCreateRoom,
	useGetRoom,
	useUpdateRoom,
} from '@/services/queries/rooms'
import { FormRoom, RoomAPI } from '@/services/queries/rooms/rooms.types'
import { useGetInfinityVolunteers } from '@/services/queries/volunteers'

import { RoomSchemaType } from './RoomDrawer.schema'

type RoomDrawerProps = {
	drawerId: string
	selectedRoom: RoomAPI['id'] | null
	setSelectedRoom: Dispatch<SetStateAction<RoomAPI['id'] | null>>
}

export const RoomDrawer = ({
	drawerId,
	selectedRoom,
	setSelectedRoom,
}: RoomDrawerProps) => {
	const { handleSubmit, formState, control, watch, reset } =
		useFormContext<RoomSchemaType>()
	const { fields, append, remove } = useFieldArray({
		name: 'members',
	})
	const { create, isPending: isPendingCreate } = useCreateRoom()
	const { update, isPending: isPendingUpdate } = useUpdateRoom()
	const { data, isLoading } = useGetRoom(selectedRoom)

	const eventId = watch('eventId')

	const {
		data: participants,
		fetchNextPage: fetchNextPageParticipants,
		hasNextPage: hasNextPageParticipants,
		isFetchingNextPage: isFetchingNextPageParticipants,
		searchParticipant,
		setSearchParticipant,
	} = useGetInfinityParticipants(eventId)
	const {
		data: volunteers,
		fetchNextPage: fetchNextPageVolunteers,
		hasNextPage: hasNextPageVolunteers,
		isFetchingNextPage: isFetchingNextPageVolunteers,
		searchVolunteer,
		setSearchVolunteer,
	} = useGetInfinityVolunteers(eventId)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

	const onSubmit: SubmitHandler<RoomSchemaType> = async (values) => {
		if (!values) return

		const formattedValues = {
			...values,
			roomNumber: values.roomNumber.padStart(2, '0'),
		}

		if (selectedRoom) {
			return await update(
				{
					roomId: selectedRoom,
					data: {
						...(formattedValues as FormRoom),
					},
				},
				{
					onSuccess: () => {
						reset()
						setSelectedRoom(null)
						toast.success('Quarto atualizado com sucesso!')
						overlayClose(drawerId)
					},
					onError: () => toast.error('Erro ao atualizar quarto'),
				},
			)
		}

		await create(formattedValues as FormRoom, {
			onSuccess: () => {
				reset()
				setSelectedRoom(null)
				toast.success('Quarto criado com sucesso!')
				overlayClose(drawerId)
			},
			onError: () => toast.error('Erro ao criar quarto'),
		})
	}

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)
	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const formattedParticipants = formatterComboBoxValues(
		participants?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)

	const lastItemRefParticipants = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPageParticipants),
		isFetchingNextPage: isFetchingNextPageParticipants,
		fetchNextPage: fetchNextPageParticipants,
	})

	const formattedVolunteers = formatterComboBoxValues(
		volunteers?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)

	const lastItemRefVolunteers = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPageVolunteers),
		isFetchingNextPage: isFetchingNextPageVolunteers,
		fetchNextPage: fetchNextPageVolunteers,
	})

	useEffect(() => {
		if (!data) return reset({}, { keepDefaultValues: true })

		reset({ ...data }, { keepDefaultValues: true })
	}, [data, reset])

	return (
		<Drawer
			drawerId={drawerId}
			headingTitle={selectedRoom ? 'Editar quarto' : 'Criar quarto'}
			className="max-w-3xl"
		>
			<DrawerBody isLoading={isLoading}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Controller
						name="eventId"
						control={control}
						render={({ field }) => (
							<ComboBox
								label="Evento"
								keyOptionLabel="label"
								keyOptionValue="value"
								options={formattedEvents}
								selectedValue={field.value}
								setSelectedValue={field.onChange}
								lastItemRef={lastItemRef}
								error={formState.errors.eventId?.message}
							/>
						)}
					/>
					<MaskedInputField format="##" fieldName="roomNumber">
						Número do quarto
					</MaskedInputField>
				</div>
				<FieldArrayContainerWithAppendButton
					handleAppendField={() => append({ member: '', type: '' })}
					leftIcon={<UserRoundPlus />}
				>
					{fields.map((field, index) => {
						const fieldMemberName = `members.${index}.member` as const
						const fieldTypeName = `members.${index}.type` as const
						const hasMoreThanOneMember = fields.length > 1
						return (
							<div key={field.id} {...(!index && { style: { marginTop: 0 } })}>
								<div className="flex items-center justify-end">
									{hasMoreThanOneMember ? (
										<Button
											className="mb-1 rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
											onClick={() => remove(index)}
											leftIcon={<UserRoundX />}
										/>
									) : null}
								</div>
								<div className="mt-1 grid grid-cols-1 md:grid-cols-2">
									<RadioField
										fieldName={fieldTypeName}
										options={MembersTypesOptionsRadio}
										position="row"
									>
										Qual tipo do membro
									</RadioField>
									{watch(fieldTypeName) === MEMBERS.PARTICIPANT ? (
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
													error={
														formState.errors.members?.[index]?.member?.message
													}
												/>
											)}
										/>
									) : (
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
													error={
														formState.errors.members?.[index]?.member?.message
													}
												/>
											)}
										/>
									)}
								</div>
							</div>
						)
					})}
				</FieldArrayContainerWithAppendButton>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(onSubmit)}
					disabled={!formState.isValid}
					isLoading={isPendingCreate || isPendingUpdate}
				>
					{selectedRoom ? 'Atualizar quarto' : 'Criar quarto'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
