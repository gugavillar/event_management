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
	InputField,
	FieldArrayContainerWithAppendButton,
	ComboBox,
	RadioField,
	SearchBox,
} from '@/components/Molecules'
import { MEMBERS, MembersTypesOptionsRadio, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { FormGroup, GroupAPI } from '@/services/queries/groups/groups.types'
import {
	useCreateGroup,
	useGetGroup,
	useUpdateGroup,
} from '@/services/queries/groups/hooks'
import { useGetInfinityParticipants } from '@/services/queries/participants'
import { useGetInfinityVolunteers } from '@/services/queries/volunteers'

import { GroupSchemaType } from './GroupDrawer.schema'

type GroupDrawerProps = {
	drawerId: string
	selectedGroup: GroupAPI['id'] | null
	setSelectedGroup: Dispatch<SetStateAction<GroupAPI['id'] | null>>
}

export const GroupDrawer = ({
	drawerId,
	selectedGroup,
	setSelectedGroup,
}: GroupDrawerProps) => {
	const { handleSubmit, formState, control, watch, reset } =
		useFormContext<GroupSchemaType>()
	const { fields, append, remove } = useFieldArray({
		name: 'members',
	})
	const { create, isPending: isPendingCreate } = useCreateGroup()
	const { update, isPending: isPendingUpdate } = useUpdateGroup()
	const { data, isLoading } = useGetGroup(selectedGroup)

	const eventId = watch('eventId')

	const {
		data: participants,
		fetchNextPage: fetchNextPageParticipants,
		hasNextPage: hasNextPageParticipants,
		isFetchingNextPage: isFetchingNextPageParticipants,
		searchParticipant,
		setSearchParticipant,
	} = useGetInfinityParticipants({
		eventId,
		hasNoGroup: selectedGroup === null,
	})
	const {
		data: volunteers,
		fetchNextPage: fetchNextPageVolunteers,
		hasNextPage: hasNextPageVolunteers,
		isFetchingNextPage: isFetchingNextPageVolunteers,
		searchVolunteer,
		setSearchVolunteer,
	} = useGetInfinityVolunteers({ eventId, hasNoGroup: selectedGroup === null })
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

	const onSubmit: SubmitHandler<GroupSchemaType> = async (values) => {
		if (!values) return

		if (values.members.length < 3) {
			return toast.error('O grupo precisa ter pelo menos 3 membros')
		}

		if (selectedGroup) {
			return await update(
				{
					groupId: selectedGroup,
					data: {
						...(values as FormGroup),
					},
				},
				{
					onSuccess: () => {
						reset()
						setSelectedGroup(null)
						toast.success('Grupo atualizado com sucesso!')
						overlayClose(drawerId)
					},
					onError: () => toast.error('Erro ao atualizar grupo'),
				},
			)
		}

		await create(values as FormGroup, {
			onSuccess: () => {
				reset()
				setSelectedGroup(null)
				toast.success('Grupo criado com sucesso!')
				overlayClose(drawerId)
			},
			onError: () => toast.error('Erro ao criar grupo'),
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

	const hasEventId = Boolean(watch('eventId'))

	return (
		<Drawer
			drawerId={drawerId}
			headingTitle={selectedGroup ? 'Editar grupo' : 'Criar grupo'}
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
					<InputField fieldName="name">Nome do grupo</InputField>
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
										)}
									{watch(fieldTypeName) === MEMBERS.VOLUNTEER && hasEventId && (
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
					{selectedGroup ? 'Atualizar grupo' : 'Criar grupo'}
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
