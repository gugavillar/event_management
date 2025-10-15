'use client'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	ComboBox,
	FieldArrayContainerWithAppendButton,
	MaskedInputField,
	ParticipantField,
	RadioField,
	VolunteerField,
} from '@/components/Molecules'
import { MEMBERS, MembersTypesOptionsRadio, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useCreateRoom,
	useGetRoom,
	useUpdateRoom,
} from '@/services/queries/rooms'
import type { FormRoom, RoomAPI } from '@/services/queries/rooms/rooms.types'
import { generateToastError } from '@/utils/errors'
import {
	Controller,
	type SubmitHandler,
	useFieldArray,
	useFormContext,
} from 'react-hook-form'
import type { RoomSchemaType } from './RoomDrawer.schema'

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
					data: {
						...(formattedValues as FormRoom),
					},
					roomId: selectedRoom,
				},
				{
					onError: (error) =>
						generateToastError(error, 'Erro ao atualizar quarto'),
					onSuccess: () => {
						reset()
						setSelectedRoom(null)
						toast.success('Quarto atualizado com sucesso!')
						overlayClose(drawerId)
					},
				}
			)
		}

		await create(formattedValues as FormRoom, {
			onError: (error) => generateToastError(error, 'Erro ao criar quarto'),
			onSuccess: () => {
				reset()
				setSelectedRoom(null)
				toast.success('Quarto criado com sucesso!')
				overlayClose(drawerId)
			},
		})
	}

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const handleClose = () => {
		reset()
		setSelectedRoom(null)
	}

	useEffect(() => {
		if (!data) return reset({}, { keepDefaultValues: true })

		reset({ ...data }, { keepDefaultValues: true })
	}, [data, reset])

	const hasEventId = Boolean(watch('eventId'))

	return (
		<Drawer
			className="max-w-3xl"
			drawerId={drawerId}
			handleClose={handleClose}
			headingTitle={selectedRoom ? 'Editar quarto' : 'Criar quarto'}
		>
			<DrawerBody isLoading={isLoading}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Controller
						control={control}
						name="eventId"
						render={({ field }) => (
							<ComboBox
								error={formState.errors.eventId?.message}
								keyOptionLabel="label"
								keyOptionValue="value"
								label="Evento"
								lastItemRef={lastItemRef}
								options={formattedEvents}
								selectedValue={field.value}
								setSelectedValue={field.onChange}
							/>
						)}
					/>
					<MaskedInputField fieldName="roomNumber" format="##">
						Número do quarto
					</MaskedInputField>
				</div>
				<FieldArrayContainerWithAppendButton
					handleAppendField={() => append({ member: '', type: '' })}
					label="Membro"
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
											leftIcon={<UserRoundX />}
											onClick={() => remove(index)}
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
									{watch(fieldTypeName) === MEMBERS.PARTICIPANT &&
										hasEventId && (
											<ParticipantField
												eventId={eventId}
												fieldError={
													formState.errors.members?.[index]?.member?.message
												}
												fieldMemberName={fieldMemberName}
												hasNoRoom={selectedRoom === null}
												isEdition={Boolean(selectedRoom)}
												key={`${fieldMemberName}-${MEMBERS.PARTICIPANT}`}
											/>
										)}
									{watch(fieldTypeName) === MEMBERS.VOLUNTEER && hasEventId && (
										<VolunteerField
											eventId={eventId}
											fieldError={
												formState.errors.members?.[index]?.member?.message
											}
											fieldMemberName={fieldMemberName}
											hasNoRoom={selectedRoom === null}
											isEdition={Boolean(selectedRoom)}
											key={`${fieldMemberName}-${MEMBERS.VOLUNTEER}`}
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
					disabled={!formState.isValid}
					isLoading={isPendingCreate || isPendingUpdate}
					onClick={handleSubmit(onSubmit)}
				>
					{selectedRoom ? 'Atualizar quarto' : 'Criar quarto'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
