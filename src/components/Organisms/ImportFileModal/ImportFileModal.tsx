'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { FileField, SelectField } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useImportParticipantsData } from '@/services/queries/participants'

import {
	ImportFileModalSchema,
	ImportFileModalType,
} from './ImportFileModal.schema'

type ImportFileModalProps = {
	modalId: string
}

export const ImportFileModal = ({ modalId }: ImportFileModalProps) => {
	const methods = useForm<ImportFileModalType>({
		defaultValues: {
			eventId: '',
			file: undefined,
		},
		resolver: zodResolver(ImportFileModalSchema),
	})
	const { data: events } = useGetEvents()
	const { importData, isPending } = useImportParticipantsData()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const handleSubmit = async (values: ImportFileModalType) => {
		await importData(
			{ eventId: values.eventId, file: values.file[0] },
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
		<Modal modalId={modalId}>
			<FormProvider {...methods}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								Importar participantes
							</Header>
							<Text>Selecione o evento e o arquivo que deseja importar</Text>
						</div>
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
