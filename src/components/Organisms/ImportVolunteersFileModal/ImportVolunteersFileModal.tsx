'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { UUID } from 'crypto'

import { Alert, Button, Header, Modal, Text } from '@/components/Atoms'
import { FileField, SelectField } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useImportVolunteersData } from '@/services/queries/volunteers'

import {
	ImportVolunteersFileModalType,
	ImportVolunteersFileModalSchema,
} from './ImportVolunteersFileModal.schema'

type ImportVolunteersFileModalProps = {
	modalId: string
}

export const ImportVolunteersFileModal = ({
	modalId,
}: ImportVolunteersFileModalProps) => {
	const methods = useForm<ImportVolunteersFileModalType>({
		defaultValues: {
			eventId: '',
			file: undefined,
		},
		resolver: zodResolver(ImportVolunteersFileModalSchema),
	})
	const { data: events } = useGetEvents()
	const { importData, isPending } = useImportVolunteersData()

	const formattedEvents: Array<{ value: UUID; label: string }> =
		formatterFieldSelectValues(events, 'name', 'id')

	const handleSubmit: SubmitHandler<ImportVolunteersFileModalType> = async (
		values,
	) => {
		await importData(
			{ eventId: values.eventId as UUID, file: values.file[0] },
			{
				onSuccess: () => {
					toast.success('Voluntários importados com sucesso!')
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
								Importar voluntários
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
