'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { UUID } from 'crypto'

import { Alert, Button, Header, Modal, Text } from '@/components/Atoms'
import { FileField, SelectField } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useImportParticipantsData } from '@/services/queries/participants'

import {
	ImportParticipantsFileModalSchema,
	ImportParticipantsFileModalType,
} from './ImportParticipantsFileModal.schema'

type ImportParticipantsFileModalProps = {
	modalId: string
}

export const ImportParticipantsFileModal = ({
	modalId,
}: ImportParticipantsFileModalProps) => {
	const methods = useForm<ImportParticipantsFileModalType>({
		defaultValues: {
			eventId: '',
			file: undefined,
		},
		resolver: zodResolver(ImportParticipantsFileModalSchema),
	})
	const { data: events } = useGetEvents()
	const { importData, isPending } = useImportParticipantsData()

	const formattedEvents: Array<{ value: UUID; label: string }> =
		formatterFieldSelectValues(events, 'name', 'id')

	const handleClose = () => {
		methods.reset()
	}

	const handleSubmit = async (values: ImportParticipantsFileModalType) => {
		await importData(
			{ eventId: values.eventId as UUID, file: values.file[0] },
			{
				onSuccess: () => {
					toast.success('Participantes importados com sucesso!')
					overlayClose(modalId)
				},
				onError: () =>
					toast.error('Alguns dados estão incorretos. Revise o arquivo.'),
			},
		)
	}
	return (
		<Modal modalId={modalId} handleClose={handleClose}>
			<FormProvider {...methods}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								Importar participantes
							</Header>
							<Text>Selecione o evento e o arquivo que deseja importar</Text>
						</div>
						<Alert description="Importe um arquivo .xlsx com todos os campos formatados como texto, incluindo números e datas" />
						<SelectField
							fieldName="eventId"
							placeholder="Selecione o evento"
							options={formattedEvents}
						>
							Evento
						</SelectField>
						<FileField fieldName="file" accept={FILES_TYPES.xlsx}>
							Arquivo
						</FileField>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							type="submit"
							onClick={methods.handleSubmit(handleSubmit)}
							isLoading={isPending}
						>
							Importar
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
