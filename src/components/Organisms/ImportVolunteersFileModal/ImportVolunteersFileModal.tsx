'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { UUID } from 'crypto'

import { Alert, Button, Header, Modal, Text } from '@/components/Atoms'
import { ComboBox, FileField } from '@/components/Molecules'
import { FILES_TYPES, overlayClose } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
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
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { importData, isPending } = useImportVolunteersData()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
	)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleClose = () => {
		methods.reset()
	}

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
		<Modal modalId={modalId} handleClose={handleClose}>
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
								/>
							)}
						/>
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
