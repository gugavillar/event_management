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
	MaskedInputField,
	VolunteerField,
	ParticipantField,
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
import { FormRoom, RoomAPI } from '@/services/queries/rooms/rooms.types'
import { generateToastError } from '@/utils/errors'

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
					onError: (error) =>
						generateToastError(error, 'Erro ao atualizar quarto'),
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
			onError: (error) => generateToastError(error, 'Erro ao criar quarto'),
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
			drawerId={drawerId}
			headingTitle={selectedRoom ? 'Editar quarto' : 'Criar quarto'}
			className="max-w-3xl"
			handleClose={handleClose}
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
					label="Membro"
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
									{watch(fieldTypeName) === MEMBERS.PARTICIPANT &&
										hasEventId && (
											<ParticipantField
												key={`${fieldMemberName}-${MEMBERS.PARTICIPANT}`}
												eventId={eventId}
												fieldMemberName={fieldMemberName}
												hasNoRoom={selectedRoom === null}
												isEdition={Boolean(selectedRoom)}
												fieldError={
													formState.errors.members?.[index]?.member?.message
												}
											/>
										)}
									{watch(fieldTypeName) === MEMBERS.VOLUNTEER && hasEventId && (
										<VolunteerField
											key={`${fieldMemberName}-${MEMBERS.VOLUNTEER}`}
											eventId={eventId}
											hasNoRoom={selectedRoom === null}
											fieldMemberName={fieldMemberName}
											isEdition={Boolean(selectedRoom)}
											fieldError={
												formState.errors.members?.[index]?.member?.message
											}
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
