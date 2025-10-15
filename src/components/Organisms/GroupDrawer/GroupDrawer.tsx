'use client'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { Controller, type SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	ComboBox,
	FieldArrayContainerWithAppendButton,
	InputField,
	ParticipantField,
	RadioField,
	VolunteerField,
} from '@/components/Molecules'
import { MEMBERS, MembersTypesOptionsRadio, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import type { FormGroup, GroupAPI } from '@/services/queries/groups/groups.types'
import { useCreateGroup, useGetGroup, useUpdateGroup } from '@/services/queries/groups/hooks'
import { generateToastError } from '@/utils/errors'

import type { GroupSchemaType } from './GroupDrawer.schema'

type GroupDrawerProps = {
	drawerId: string
	selectedGroup: GroupAPI['id'] | null
	setSelectedGroup: Dispatch<SetStateAction<GroupAPI['id'] | null>>
}

export const GroupDrawer = ({ drawerId, selectedGroup, setSelectedGroup }: GroupDrawerProps) => {
	const { handleSubmit, formState, control, watch, reset } = useFormContext<GroupSchemaType>()
	const { fields, append, remove } = useFieldArray({
		name: 'members',
	})
	const { create, isPending: isPendingCreate } = useCreateGroup()
	const { update, isPending: isPendingUpdate } = useUpdateGroup()
	const { data, isLoading } = useGetGroup(selectedGroup)

	const eventId = watch('eventId')
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()

	const onSubmit: SubmitHandler<GroupSchemaType> = async (values) => {
		if (!values) return

		if (values.members.length < 3) {
			return toast.error('O grupo precisa ter pelo menos 3 membros')
		}

		if (selectedGroup) {
			return await update(
				{
					data: {
						...(values as FormGroup),
					},
					groupId: selectedGroup,
				},
				{
					onError: (error) => generateToastError(error, 'Erro ao atualizar grupo'),
					onSuccess: () => {
						reset()
						setSelectedGroup(null)
						toast.success('Grupo atualizado com sucesso!')
						overlayClose(drawerId)
					},
				}
			)
		}

		await create(values as FormGroup, {
			onError: (error) => generateToastError(error, 'Erro ao criar grupo'),
			onSuccess: () => {
				reset()
				setSelectedGroup(null)
				toast.success('Grupo criado com sucesso!')
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
		setSelectedGroup(null)
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
			headingTitle={selectedGroup ? 'Editar grupo' : 'Criar grupo'}
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
					<InputField fieldName="name">Nome do grupo</InputField>
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
									<RadioField fieldName={fieldTypeName} options={MembersTypesOptionsRadio} position="row">
										Qual tipo do membro
									</RadioField>
									{watch(fieldTypeName) === MEMBERS.PARTICIPANT && hasEventId && (
										<ParticipantField
											eventId={eventId}
											fieldError={formState.errors.members?.[index]?.member?.message}
											fieldMemberName={fieldMemberName}
											hasNoGroup={selectedGroup === null}
											isEdition={Boolean(selectedGroup)}
											key={`${fieldMemberName}-${MEMBERS.PARTICIPANT}`}
										/>
									)}
									{watch(fieldTypeName) === MEMBERS.VOLUNTEER && hasEventId && (
										<VolunteerField
											eventId={eventId}
											fieldError={formState.errors.members?.[index]?.member?.message}
											fieldMemberName={fieldMemberName}
											hasNoGroup={selectedGroup === null}
											isEdition={Boolean(selectedGroup)}
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
					{selectedGroup ? 'Atualizar grupo' : 'Criar grupo'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
