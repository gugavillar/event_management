'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import saveAs from 'file-saver'
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { FILES_TYPES, PARTICIPANT_MODAL_TYPE } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetExportParticipantsData } from '@/services/queries/participants'

import type { SelectedParticipant } from '../ExportParticipantsButton'
import {
	ExportParticipantsFileModalSchema,
	type ExportParticipantsFileModalType,
} from './ExportParticipantsDataModal.schema'

type ExportParticipantsDataModalProps = {
	open: SelectedParticipant
	setOpen: Dispatch<SetStateAction<SelectedParticipant>>
	isInterested?: boolean
}

const TOAST_ID = 'download-template-participants'

export const ExportParticipantsDataModal = ({ open, setOpen, isInterested }: ExportParticipantsDataModalProps) => {
	const [eventId, setEventId] = useState('')
	const methods = useForm<ExportParticipantsFileModalType>({
		defaultValues: {
			eventId: '',
		},
		resolver: zodResolver(ExportParticipantsFileModalSchema),
	})
	const { data: events, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfinityEvents()
	const { data, isError, isFetching } = useGetExportParticipantsData(eventId, isInterested)

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
			toast.error('Erro ao baixar arquivo ou evento sem participantes', { id: TOAST_ID })
			setEventId('')
			handleClose()
			return
		}

		if (!data) return

		const blob = new Blob([data], {
			type: FILES_TYPES.xlsx,
		})
		const eventName = formattedEvents.find((event) => event.customProps.value === eventId)?.customProps?.label ?? ''
		saveAs(blob, isInterested ? `Interessados-${eventName}.xlsx` : `Participantes-${eventName}.xlsx`)

		setEventId('')
		toast.dismiss(TOAST_ID)
		toast.success('Arquivo baixado com sucesso!')
		handleClose()
	}, [data, isError, eventId, formattedEvents, isInterested, handleClose])

	const handleSubmit = async (values: ExportParticipantsFileModalType) => {
		if (!values.eventId) return

		setEventId(values.eventId)
	}

	return (
		<Modal onOpenChange={handleClose} open={open.modal === PARTICIPANT_MODAL_TYPE.EXPORT}>
			<FormProvider {...methods}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								{isInterested ? 'Exportar interessados' : 'Exportar participantes'}
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
