'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import saveAs from 'file-saver'
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { FILES_TYPES, MEETING_MODAL_TYPE } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetExportMeetingPresence } from '@/services/queries/meetings'

import type { SelectedMeeting } from '../ExportMeetingButton'
import { ExportMeetingFileModalSchema, type ExportMeetingFileModalType } from './ExportMeetingDataModal.schema'

type ExportMeetingDataModalProps = {
	open: SelectedMeeting
	setOpen: Dispatch<SetStateAction<SelectedMeeting>>
}

const TOAST_ID = 'download-export-meeting'

export const ExportMeetingDataModal = ({ open, setOpen }: ExportMeetingDataModalProps) => {
	const [eventId, setEventId] = useState('')
	const methods = useForm<ExportMeetingFileModalType>({
		defaultValues: {
			eventId: '',
		},
		resolver: zodResolver(ExportMeetingFileModalSchema),
	})
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
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

	const handleClose = useCallback(() => {
		methods.reset()
		setOpen({ modal: null })
	}, [methods.reset, setOpen])

	useEffect(() => {
		if (!eventId) return

		if (isError) {
			toast.error('Erro ao baixar arquivo ou evento sem reuniões', {
				id: TOAST_ID,
			})
			setEventId('')
			handleClose()
			return
		}

		if (!data) return

		const blob = new Blob([data], {
			type: FILES_TYPES.xlsx,
		})
		const eventName = formattedEvents.find((event) => event.customProps.value === eventId)?.customProps?.label ?? ''
		saveAs(blob, `Reuniões-${eventName}.xlsx`)

		setEventId('')
		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
		handleClose()
	}, [data, isError, eventId, formattedEvents, handleClose])

	const handleSubmit = async (values: ExportMeetingFileModalType) => {
		if (!values.eventId) return

		setEventId(values.eventId)
	}

	return (
		<Modal onOpenChange={handleClose} open={open.modal === MEETING_MODAL_TYPE.EXPORT}>
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
