'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import saveAs from 'file-saver'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetExportParticipantsData } from '@/services/queries/participants'

import {
	ExportParticipantsFileModalSchema,
	ExportParticipantsFileModalType,
} from './ExportParticipantsDataModal.schema'

type ExportParticipantsDataModalProps = {
	modalId: string
	isInterested?: boolean
}

const TOAST_ID = 'download-template-participants'

export const ExportParticipantsDataModal = ({
	modalId,
	isInterested,
}: ExportParticipantsDataModalProps) => {
	const [eventId, setEventId] = useState('')
	const methods = useForm<ExportParticipantsFileModalType>({
		defaultValues: {
			eventId: '',
		},
		resolver: zodResolver(ExportParticipantsFileModalSchema),
	})
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data, isError, isFetching } = useGetExportParticipantsData(
		eventId,
		isInterested,
	)

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
		methods.reset()
	}

	useEffect(() => {
		if (!eventId) return

		if (isError) {
			toast.error('Erro ao baixar arquivo ou evento sem participantes')
			setEventId('')
			methods.reset()
			return
		}

		if (!data) return

		const blob = new Blob([data], {
			type: FILES_TYPES.xlsx,
		})
		const eventName =
			formattedEvents.find((event) => event.customProps.value === eventId)
				?.customProps?.label ?? ''
		saveAs(
			blob,
			isInterested
				? `Interessados-${eventName}.xlsx`
				: `Participantes-${eventName}.xlsx`,
		)

		setEventId('')
		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
		methods.reset()
		overlayClose(modalId)
	}, [data, isError, eventId, formattedEvents, methods, modalId, isInterested])

	const handleSubmit = async (values: ExportParticipantsFileModalType) => {
		if (!values.eventId) return

		setEventId(values.eventId)
	}

	return (
		<Modal modalId={modalId} handleClose={handleClose}>
			<FormProvider {...methods}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								{isInterested
									? 'Exportar interessados'
									: 'Exportar participantes'}
							</Header>
							<Text>Selecione o evento que deseja exportar os dados</Text>
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
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							type="submit"
							onClick={methods.handleSubmit(handleSubmit)}
							disabled={!methods.formState.isValid}
							isLoading={isFetching}
						>
							Exportar
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
