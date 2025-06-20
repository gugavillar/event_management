'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Select } from '@/components/Atoms'
import {
	ComboBox,
	CreateMeetingButton,
	ListManager,
} from '@/components/Molecules'
import {
	ExportMeetingButton,
	ListPage,
	PageContent,
} from '@/components/Organisms'
import {
	formatterComboBoxValues,
	formatterFieldSelectValues,
} from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useCreateMeetingPresence,
	useGetMeeting,
	useGetMeetingsByEventId,
} from '@/services/queries/meetings'

import { MeetingSchema, MeetingSchemaType } from './Meetings.schema'
import { formatTableData, HEADER_LABELS } from './Meetings.utils'

export const Meetings = () => {
	const methods = useForm<MeetingSchemaType>({
		defaultValues: {
			presence: [],
			justification: [],
		},
		resolver: zodResolver(MeetingSchema),
	})
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data: meetings, setEventId, eventId } = useGetMeetingsByEventId()
	const { data: meeting, setMeetingId, meetingId, isLoading } = useGetMeeting()
	const { create, isPending } = useCreateMeetingPresence()

	const onSubmit: SubmitHandler<MeetingSchemaType> = async (values) => {
		if (!values) return

		const formattedValues = {
			...values,
			meetingId,
		}

		await create(formattedValues, {
			onSuccess: () => {
				setMeetingId('')
				setEventId(null)
				methods.reset()
				toast.success('Presença registrada com sucesso!')
			},
			onError: () => toast.error('Erro ao registrar presença'),
		})
	}

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

	const formattedMeetings = formatterFieldSelectValues(
		meetings ?? [],
		'title',
		'id',
	)

	const formattedPresenceList = formatTableData(meeting, methods.watch)

	return (
		<PageContent pageTitle="Reuniões" subheadingPage="Lista de presença">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportMeetingButton />
				<CreateMeetingButton />
			</div>
			<ListPage
				className="w-full lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
						/>
						<Select
							placeholder="Selecione a reunião"
							options={formattedMeetings}
							disabled={!eventId || !formattedMeetings?.length}
							value={meetingId}
							onChange={(e) => {
								methods.reset()
								setMeetingId(e.target.value)
							}}
						/>
					</>
				}
			>
				{!meetingId ? (
					<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
						<h3 className="text-lg font-bold text-gray-800">
							Selecione a reunião
						</h3>
						<p className="mt-2 text-gray-500">
							Para gerar a lista de presença é necessário selecionar o evento e
							selecionar a reunião, caso a reunião não exista crie uma.
						</p>
					</div>
				) : (
					<FormProvider {...methods}>
						<ListManager
							headerLabels={HEADER_LABELS}
							bodyData={formattedPresenceList}
							isLoading={isLoading}
						/>
						<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
							<Button
								type="button"
								onClick={methods.handleSubmit(onSubmit)}
								isLoading={isPending}
								className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							>
								Finalizar presença
							</Button>
						</div>
					</FormProvider>
				)}
			</ListPage>
		</PageContent>
	)
}
