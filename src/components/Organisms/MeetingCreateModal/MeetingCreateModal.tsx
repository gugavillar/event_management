'use client'
import { memo } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox, InputField, MaskedInputField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatDateToSendToApi, formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useCreateMeeting } from '@/services/queries/meetings'
import { generateToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useForm,
} from 'react-hook-form'
import {
	MeetingCreateModalSchema,
	type MeetingCreateModalType,
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
			defaultValues: {
				date: '',
				eventId: '',
				title: '',
			},
			mode: 'onChange',
			resolver: zodResolver(MeetingCreateModalSchema),
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
				onError: (error) => generateToastError(error, 'Erro ao criar reunião'),
				onSuccess: () => {
					handleCloseModal()
					toast.success('Reunião criada com sucesso!')
				},
			})
		}

		return (
			<Modal handleClose={handleCloseModal} modalId={modalId}>
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
							<InputField fieldName="title">Título da reunião</InputField>
							<MaskedInputField fieldName="date" format="##/##/####">
								Data da reunião
							</MaskedInputField>
							<div className="flex w-full items-center justify-between gap-x-8">
								<Button
									className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
									disabled={!methods.formState.isValid}
									isLoading={isPending}
									onClick={methods.handleSubmit(onSubmit)}
									type="submit"
								>
									Criar
								</Button>
							</div>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	}
)

MeetingCreateModal.displayName = 'MeetingCreateModal'
