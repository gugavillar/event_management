'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetExportMeetingPresence } from '@/services/queries/meetings'
import { zodResolver } from '@hookform/resolvers/zod'
import saveAs from 'file-saver'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
	ExportMeetingFileModalSchema,
	type ExportMeetingFileModalType,
} from './ExportMeetingDataModal.schema'

type ExportMeetingDataModalProps = {
	modalId: string
}

const TOAST_ID = 'download-export-meeting'

export const ExportMeetingDataModal = ({
	modalId,
}: ExportMeetingDataModalProps) => {
	const [eventId, setEventId] = useState('')
	const methods = useForm<ExportMeetingFileModalType>({
		defaultValues: {
			eventId: '',
		},
		resolver: zodResolver(ExportMeetingFileModalSchema),
	})
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data, isError, isFetching } = useGetExportMeetingPresence(eventId)

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
		methods.reset()
	}

	useEffect(() => {
		if (!eventId) return

		if (isError) {
			toast.error('Erro ao baixar arquivo ou evento sem reuniões')
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
		saveAs(blob, `Reuniões-${eventName}.xlsx`)

		setEventId('')
		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
		methods.reset()
		overlayClose(modalId)
	}, [data, isError, eventId, formattedEvents, methods, modalId])

	const handleSubmit = async (values: ExportMeetingFileModalType) => {
		if (!values.eventId) return

		setEventId(values.eventId)
	}

	return (
		<Modal handleClose={handleClose} modalId={modalId}>
			<FormProvider {...methods}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								Exportar reuniões
							</Header>
							<Text>Selecione o evento que deseja exportar os dados</Text>
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
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							disabled={!methods.formState.isValid}
							isLoading={isFetching}
							onClick={methods.handleSubmit(handleSubmit)}
							type="submit"
						>
							Exportar
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
