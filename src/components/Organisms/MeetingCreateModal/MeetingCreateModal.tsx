'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react'
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox, InputField, MaskedInputField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatDateToSendToApi, formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useCreateMeeting } from '@/services/queries/meetings'
import { generateToastError } from '@/utils/errors'

import {
	MeetingCreateModalSchema,
	MeetingCreateModalType,
} from './MeetingCreateModal.schema'

type MeetingCreateModalProps = {
	modalId: string
}

export const MeetingCreateModal = memo(
	({ modalId }: MeetingCreateModalProps) => {
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
		} = useGetInfinityEvents()
		const { create, isPending } = useCreateMeeting()

		const methods = useForm<MeetingCreateModalType>({
			mode: 'onChange',
			defaultValues: {
				eventId: '',
				date: '',
				title: '',
			},
			resolver: zodResolver(MeetingCreateModalSchema),
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

		const handleCloseModal = () => {
			methods.reset()
			overlayClose(modalId)
		}

		const onSubmit: SubmitHandler<MeetingCreateModalType> = async (values) => {
			if (!values) return

			const formattedValues = {
				...values,
				date: formatDateToSendToApi(values.date),
			}

			await create(formattedValues, {
				onSuccess: () => {
					handleCloseModal()
					toast.success('Reunião criada com sucesso!')
				},
				onError: (error) => generateToastError(error, 'Erro ao criar reunião'),
			})
		}

		return (
			<Modal modalId={modalId} handleClose={handleCloseModal}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<div className="space-y-4 text-center">
								<Header as="h3" className="text-2xl">
									Criar nova reunião
								</Header>
								<Text>
									Crie uma nova reunião para registrar a presença dos
									voluntários.
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
							<InputField fieldName="title">Título da reunião</InputField>
							<MaskedInputField format="##/##/####" fieldName="date">
								Data da reunião
							</MaskedInputField>
							<div className="flex w-full items-center justify-between gap-x-8">
								<Button
									className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
									type="submit"
									onClick={methods.handleSubmit(onSubmit)}
									disabled={!methods.formState.isValid}
									isLoading={isPending}
								>
									Criar
								</Button>
							</div>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	},
)

MeetingCreateModal.displayName = 'MeetingCreateModal'
