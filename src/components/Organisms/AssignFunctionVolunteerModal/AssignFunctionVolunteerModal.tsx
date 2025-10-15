'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Trash2 } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction, useEffect } from 'react'
import { Controller, FormProvider, type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { CheckboxField, ComboBox, FieldArrayContainerWithAppendButton, SelectField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetFunctions, useUpdateVolunteerFunction } from '@/services/queries/volunteers'
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

import { AssignFunctionSchema, type AssignFunctionType } from './AssignFunctionVolunteerModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedVolunteer: VolunteersAPI['id'] | null
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const AssignFunctionVolunteerModal = memo(
	({ modalId, selectedVolunteer, setSelectedVolunteer }: CreateVolunteerFunctionModalProps) => {
		const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
		const { data: roles, setEventId } = useGetFunctions()
		const { isPending, update } = useUpdateVolunteerFunction()

		const methods = useForm<AssignFunctionType>({
			defaultValues: {
				eventId: '',
				roles: [{ isLeader: false, roleId: '' }],
			},
			mode: 'onChange',
			resolver: zodResolver(AssignFunctionSchema),
		})
		const { fields, append, remove } = useFieldArray({
			control: methods.control,
			name: 'roles',
		})

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
				{ data: values, volunteerId: selectedVolunteer },
				{
					onError: (error) => generateToastError(error, 'Erro ao atribuir funções'),
					onSuccess: () => {
						handleCloseModal()
						toast.success('Funções atribuídas com sucesso!')
					},
				}
			)
		}

		const handleRemoveFunctions = async () => {
			if (!selectedVolunteer) return

			await update(
				{
					data: { eventId: selectedEventId, roles: [] },
					onlyRemove: true,
					volunteerId: selectedVolunteer,
				},
				{
					onError: (error) => generateToastError(error, 'Erro ao remover funções'),
					onSuccess: () => {
						handleCloseModal()
						toast.success('Funções removidas com sucesso!')
					},
				}
			)
		}

		useEffect(() => {
			if (!selectedEventId) return

			setEventId(selectedEventId)
		}, [selectedEventId, setEventId])

		return (
			<Modal handleClose={handleCloseModal} modalId={modalId}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<div className="space-y-4 text-center">
								<Header as="h3" className="text-2xl">
									Atribuir ou remover funções
								</Header>
								<Text>Selecione o evento depois uma ou mais funções e clique em Atribuir.</Text>
								<Text>Para remover todas as funções, selecione o evento e clique em Remover.</Text>
							</div>
							<Controller
								control={methods.control}
								name="eventId"
								render={({ field }) => (
									<ComboBox
										error={methods.formState.errors.eventId?.message}
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
							<FieldArrayContainerWithAppendButton
								className="w-full"
								handleAppendField={() => append({ isLeader: false, roleId: '' })}
								label="Função"
								leftIcon={<CirclePlus />}
							>
								{fields.map((field, index) => {
									const fieldName = `roles.${index}.roleId`
									const checkFieldName = `roles.${index}.isLeader`
									const hasMoreThanOneFunction = fields.length > 1
									return (
										<div className="w-full" key={field.id}>
											<div className="flex flex-col gap-4">
												<SelectField
													fieldName={fieldName}
													options={formattedRoles ?? []}
													placeholder="Selecione a função"
												>
													<div className="flex items-center justify-between">
														Função
														{hasMoreThanOneFunction ? (
															<Button
																className="mb-1 rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
																leftIcon={<Trash2 size={18} />}
																onClick={() => remove(index)}
															/>
														) : null}
													</div>
												</SelectField>
												<CheckboxField fieldName={checkFieldName} label="Voluntário é o líder da função" />
											</div>
										</div>
									)
								})}
							</FieldArrayContainerWithAppendButton>
							<div className="flex w-full items-center justify-between gap-x-8">
								<Button
									className="w-full items-center justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-slate-800"
									disabled={isPending || !selectedEventId}
									isLoading={isPending}
									onClick={handleRemoveFunctions}
									type="button"
								>
									Remover
								</Button>
								<Button
									className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
									disabled={!methods.formState.isValid}
									isLoading={isPending}
									onClick={methods.handleSubmit(handleSubmit)}
									type="submit"
								>
									Atribuir
								</Button>
							</div>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	}
)

AssignFunctionVolunteerModal.displayName = 'AssignFunctionVolunteerModal'
