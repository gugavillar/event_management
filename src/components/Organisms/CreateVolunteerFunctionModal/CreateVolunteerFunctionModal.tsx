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

import { Button, Header, Modal } from '@/components/Atoms'
import {
	ComboBox,
	FieldArrayContainerWithAppendButton,
	InputField,
} from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useCreateFunction,
	useUpdateFunction,
} from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

import {
	FunctionSchema,
	FunctionSchemaType,
} from './CreateVolunteerFunctionModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedFunction: VolunteersFunctionsFromAPI | null
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
}

export const CreateVolunteerFunctionModal = memo(
	({
		modalId,
		selectedFunction,
		setSelectedFunction,
	}: CreateVolunteerFunctionModalProps) => {
		const methods = useForm<FunctionSchemaType>({
			mode: 'onChange',
			defaultValues: {
				role: '',
				events: [{ id: '' }],
			},
			resolver: zodResolver(FunctionSchema),
		})
		const { append, fields, remove } = useFieldArray({
			control: methods.control,
			name: 'events',
		})
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
		} = useGetInfinityEvents()
		const { create, isPending: isPendingCreate } = useCreateFunction()
		const { update, isPending: isPendingUpdate } = useUpdateFunction()

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

		const handleSubmit: SubmitHandler<FunctionSchemaType> = async (values) => {
			if (selectedFunction) {
				return await update(
					{ id: selectedFunction.volunteerRoleId, ...values },
					{
						onSuccess: () => {
							toast.success('Função atualizada com sucesso!')
							methods.reset()
							setSelectedFunction(null)
							overlayClose(modalId)
						},
						onError: (error) =>
							generateToastError(error, 'Erro ao atualizar a função'),
					},
				)
			}
			await create(values, {
				onSuccess: () => {
					toast.success('Função cadastrada com sucesso!')
					methods.reset()
					overlayClose(modalId)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao cadastrar a função'),
			})
		}

		useEffect(() => {
			if (!selectedFunction) return methods.reset()
			methods.reset(
				{
					role: selectedFunction.volunteerRole?.role,
					events: [{ id: selectedFunction.eventId }],
				},
				{ keepDefaultValues: true },
			)
		}, [methods, selectedFunction])

		return (
			<Modal modalId={modalId} handleClose={() => setSelectedFunction(null)}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<Header as="h3" className="text-2xl">
								{selectedFunction ? 'Editar' : 'Criar'} função
							</Header>
							<InputField fieldName="role">Função</InputField>
							<FieldArrayContainerWithAppendButton
								className="w-full"
								label="Evento"
								leftIcon={<CirclePlus />}
								handleAppendField={() => append({ id: '' })}
							>
								{fields.map((input, index) => {
									const hasMoreThanOneEvent = fields.length > 1
									return (
										<div key={input.id} className="w-full">
											<div className="flex flex-row gap-4">
												<Controller
													name={`events.${index}.id`}
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
															error={
																methods.formState.errors.events?.[index]?.id
																	?.message
															}
														/>
													)}
												/>
												{hasMoreThanOneEvent ? (
													<Button
														className="h-fit rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
														onClick={() => remove(index)}
														leftIcon={<Trash2 size={18} />}
													/>
												) : null}
											</div>
										</div>
									)
								})}
							</FieldArrayContainerWithAppendButton>
							<Button
								className="w-full max-w-40 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								type="submit"
								onClick={methods.handleSubmit(handleSubmit)}
								disabled={
									!methods.formState.isValid || !methods.formState.isDirty
								}
								isLoading={isPendingCreate || isPendingUpdate}
							>
								Salvar
							</Button>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	},
)

CreateVolunteerFunctionModal.displayName = 'CreateVolunteerFunctionModal'
