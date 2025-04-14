'use client'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { FileField, SelectField } from '@/components/Molecules'
import { formatterFieldSelectValues } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useImportParticipantsData } from '@/services/queries/participants'

type ImportFileModalProps = {
	modalId: string
}

export const ImportFileModal = ({ modalId }: ImportFileModalProps) => {
	const methods = useForm()
	const { data: events } = useGetEvents()
	const { importData, isPending } = useImportParticipantsData()

	const formattedEvents = formatterFieldSelectValues(events?.data, 'name', 'id')

	const handleSubmit = async (values: any) => {
		await importData({ eventId: values.eventId, file: values.file[0] })
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
						<FileField fieldName="file">Arquivo</FileField>
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
