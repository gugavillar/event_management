'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Trash2 } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction, useEffect } from 'react'
import { Controller, FormProvider, type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import { ComboBox, FieldArrayContainerWithAppendButton, InputField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useCreateFunction, useUpdateFunction } from '@/services/queries/volunteers'
import type { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

import { FunctionSchema, type FunctionSchemaType } from './CreateVolunteerFunctionModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedFunction: VolunteersFunctionsFromAPI | null
	setSelectedFunction: Dispatch<SetStateAction<VolunteersFunctionsFromAPI | null>>
}

export const CreateVolunteerFunctionModal = memo(
	({ modalId, selectedFunction, setSelectedFunction }: CreateVolunteerFunctionModalProps) => {
		const methods = useForm<FunctionSchemaType>({
			defaultValues: {
				events: [{ id: '' }],
				role: '',
			},
			mode: 'onChange',
			resolver: zodResolver(FunctionSchema),
		})
		const { append, fields, remove } = useFieldArray({
			control: methods.control,
			name: 'events',
		})
		const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
		const { create, isPending: isPendingCreate } = useCreateFunction()
		const { update, isPending: isPendingUpdate } = useUpdateFunction()

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

		const handleSubmit: SubmitHandler<FunctionSchemaType> = async (values) => {
			if (selectedFunction) {
				return await update(
					{ id: selectedFunction.volunteerRoleId, ...values },
					{
						onError: (error) => generateToastError(error, 'Erro ao atualizar a função'),
						onSuccess: () => {
							toast.success('Função atualizada com sucesso!')
							methods.reset()
							setSelectedFunction(null)
							overlayClose(modalId)
						},
					}
				)
			}
			await create(values, {
				onError: (error) => generateToastError(error, 'Erro ao cadastrar a função'),
				onSuccess: () => {
					toast.success('Função cadastrada com sucesso!')
					methods.reset()
					overlayClose(modalId)
				},
			})
		}

		useEffect(() => {
			if (!selectedFunction) return methods.reset()
			methods.reset(
				{
					events: [{ id: selectedFunction.eventId }],
					role: selectedFunction.volunteerRole?.role,
				},
				{ keepDefaultValues: true }
			)
		}, [methods, selectedFunction])

		return (
			<Modal handleClose={() => setSelectedFunction(null)} modalId={modalId}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<Header as="h3" className="text-2xl">
								{selectedFunction ? 'Editar' : 'Criar'} função
							</Header>
							<InputField fieldName="role">Função</InputField>
							<FieldArrayContainerWithAppendButton
								className="w-full"
								handleAppendField={() => append({ id: '' })}
								label="Evento"
								leftIcon={<CirclePlus />}
							>
								{fields.map((input, index) => {
									const hasMoreThanOneEvent = fields.length > 1
									return (
										<div className="w-full" key={input.id}>
											<div className="flex flex-row gap-4">
												<Controller
													control={methods.control}
													name={`events.${index}.id`}
													render={({ field }) => (
														<ComboBox
															error={methods.formState.errors.events?.[index]?.id?.message}
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
												{hasMoreThanOneEvent ? (
													<Button
														className="h-fit rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
														leftIcon={<Trash2 size={18} />}
														onClick={() => remove(index)}
													/>
												) : null}
											</div>
										</div>
									)
								})}
							</FieldArrayContainerWithAppendButton>
							<Button
								className="w-full max-w-40 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={!methods.formState.isValid || !methods.formState.isDirty}
								isLoading={isPendingCreate || isPendingUpdate}
								onClick={methods.handleSubmit(handleSubmit)}
								type="submit"
							>
								Salvar
							</Button>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	}
)

CreateVolunteerFunctionModal.displayName = 'CreateVolunteerFunctionModal'
