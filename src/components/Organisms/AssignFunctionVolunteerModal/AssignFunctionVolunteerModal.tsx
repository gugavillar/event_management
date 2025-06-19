'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Trash2 } from 'lucide-react'
import { Dispatch, memo, SetStateAction, useEffect } from 'react'
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import {
	CheckboxField,
	ComboBox,
	FieldArrayContainerWithAppendButton,
	SelectField,
} from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useGetFunctions,
	useUpdateVolunteerFunction,
} from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

import {
	AssignFunctionSchema,
	AssignFunctionType,
} from './AssignFunctionVolunteerModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedVolunteer: VolunteersAPI['id'] | null
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const AssignFunctionVolunteerModal = memo(
	({
		modalId,
		selectedVolunteer,
		setSelectedVolunteer,
	}: CreateVolunteerFunctionModalProps) => {
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
		} = useGetInfinityEvents()
		const { data: roles, setEventId } = useGetFunctions()
		const { isPending, update } = useUpdateVolunteerFunction()

		const methods = useForm<AssignFunctionType>({
			mode: 'onChange',
			defaultValues: {
				eventId: '',
				roles: [{ roleId: '', isLeader: false }],
			},
			resolver: zodResolver(AssignFunctionSchema),
		})
		const { fields, append, remove } = useFieldArray({
			control: methods.control,
			name: 'roles',
		})

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

		const formattedRoles = roles?.map((role) => ({
			label: role.volunteerRole.role,
			value: role.volunteerRole.id,
		}))

		const handleCloseModal = () => {
			methods.reset()
			setSelectedVolunteer(null)
			overlayClose(modalId)
		}

		const selectedEventId = methods.watch('eventId')

		const handleSubmit: SubmitHandler<AssignFunctionType> = async (values) => {
			if (!selectedVolunteer) return

			await update(
				{ volunteerId: selectedVolunteer, data: values },
				{
					onSuccess: () => {
						handleCloseModal()
						toast.success('Funções atribuídas com sucesso!')
					},
					onError: (error) =>
						generateToastError(error, 'Erro ao atribuir funções'),
				},
			)
		}

		const handleRemoveFunctions = async () => {
			if (!selectedVolunteer) return

			await update(
				{
					volunteerId: selectedVolunteer,
					data: { eventId: selectedEventId, roles: [] },
					onlyRemove: true,
				},
				{
					onSuccess: () => {
						handleCloseModal()
						toast.success('Funções removidas com sucesso!')
					},
					onError: (error) =>
						generateToastError(error, 'Erro ao remover funções'),
				},
			)
		}

		useEffect(() => {
			if (!selectedEventId) return

			setEventId(selectedEventId)
		}, [selectedEventId, setEventId])

		return (
			<Modal modalId={modalId} handleClose={handleCloseModal}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<div className="space-y-4 text-center">
								<Header as="h3" className="text-2xl">
									Atribuir ou remover funções
								</Header>
								<Text>
									Selecione o evento depois uma ou mais funções e clique em
									Atribuir.
								</Text>
								<Text>
									Para remover todas as funções, selecione o evento e clique em
									Remover.
								</Text>
							</div>
							<Controller
								name="eventId"
								control={methods.control}
								render={({ field }) => (
									<ComboBox
										keyOptionLabel="label"
										keyOptionValue="value"
										options={formattedEvents}
										selectedValue={field.value}
										setSelectedValue={field.onChange}
										lastItemRef={lastItemRef}
										label="Evento"
										error={methods.formState.errors.eventId?.message}
									/>
								)}
							/>
							<FieldArrayContainerWithAppendButton
								className="w-full"
								label="Função"
								leftIcon={<CirclePlus />}
								handleAppendField={() =>
									append({ roleId: '', isLeader: false })
								}
							>
								{fields.map((field, index) => {
									const fieldName = `roles.${index}.roleId`
									const checkFieldName = `roles.${index}.isLeader`
									const hasMoreThanOneFunction = fields.length > 1
									return (
										<div key={field.id} className="w-full">
											<div className="flex flex-col gap-4">
												<SelectField
													fieldName={fieldName}
													placeholder="Selecione a função"
													options={formattedRoles ?? []}
												>
													<div className="flex items-center justify-between">
														Função
														{hasMoreThanOneFunction ? (
															<Button
																className="mb-1 rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
																onClick={() => remove(index)}
																leftIcon={<Trash2 size={18} />}
															/>
														) : null}
													</div>
												</SelectField>
												<CheckboxField
													label="Voluntário é o líder da função"
													fieldName={checkFieldName}
												/>
											</div>
										</div>
									)
								})}
							</FieldArrayContainerWithAppendButton>
							<div className="flex w-full items-center justify-between gap-x-8">
								<Button
									type="button"
									className="w-full items-center justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-slate-800"
									disabled={isPending || !selectedEventId}
									isLoading={isPending}
									onClick={handleRemoveFunctions}
								>
									Remover
								</Button>
								<Button
									className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
									type="submit"
									onClick={methods.handleSubmit(handleSubmit)}
									disabled={!methods.formState.isValid}
									isLoading={isPending}
								>
									Atribuir
								</Button>
							</div>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	},
)

AssignFunctionVolunteerModal.displayName = 'AssignFunctionVolunteerModal'
