'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Field, Select } from '@/components/Atoms'
import {
	ComboBox,
	CreateMeetingButton,
	ListManager,
} from '@/components/Molecules'
import {
	ExportMeetingButton,
	ListPage,
	MeetingAlertModal,
	PageContent,
} from '@/components/Organisms'
import { MODALS_IDS, overlayClose, overlayOpen } from '@/constants'
import {
	formatterComboBoxValues,
	formatterFieldSelectValues,
} from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useGetMeeting,
	useGetMeetingsByEventId,
} from '@/services/queries/meetings'

import { MeetingSchema, MeetingSchemaType } from './Meetings.schema'
import { formatTableData, HEADER_LABELS } from './Meetings.utils'

export const Meetings = () => {
	const [type, setType] = useState<'draft' | 'send'>('send')
	const [search, setSearch] = useState('')
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

	const handleOpenAlert = (type: 'draft' | 'send') => {
		setType(type)
		overlayOpen(MODALS_IDS.MEETING_ALERT_MODAL)
	}

	const clearState = () => {
		overlayClose(MODALS_IDS.MEETING_ALERT_MODAL)
		setTimeout(() => {
			setMeetingId('')
			setEventId(null)
		}, 800)
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

	const debounceSearch = useDebounce(search, 500)

	let formattedPresenceList = formatTableData(meeting?.meeting, methods.watch)
	formattedPresenceList = formattedPresenceList.filter((item) =>
		item.name.toLowerCase().includes(debounceSearch.toLowerCase()),
	)

	useEffect(() => {
		const storedData = localStorage.getItem(meetingId)
		if (storedData) {
			const parsedData = JSON.parse(storedData)
			const isSameMeeting = meetingId === parsedData.meetingId

			if (!isSameMeeting) return

			methods.reset(parsedData, { keepDefaultValues: true })
		}
	}, [meetingId, methods])

	const hasPreviousRecord =
		!!meeting?.presenceResponse.justification?.length &&
		!!meeting?.presenceResponse.presence?.length

	useEffect(() => {
		if (!hasPreviousRecord) return

		methods.reset(
			{
				presence: meeting?.presenceResponse.presence,
				justification: meeting?.presenceResponse.justification,
			},
			{ keepDefaultValues: true },
		)
	}, [
		hasPreviousRecord,
		meeting?.presenceResponse.justification,
		meeting?.presenceResponse.presence,
		methods,
	])

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
						<Field
							placeholder="Encontrar voluntário"
							rightIcon={<Search size={24} />}
							className="ps-11"
							value={search}
							disabled={!eventId && !formattedMeetings?.length}
							onChange={(event) => setSearch?.(event.target.value)}
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
								onClick={() => handleOpenAlert('draft')}
								type="button"
								className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							>
								Salvar rascunho
							</Button>
							<Button
								onClick={() => handleOpenAlert('send')}
								type="button"
								className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							>
								Enviar presenças
							</Button>
						</div>
						<MeetingAlertModal
							modalId={MODALS_IDS.MEETING_ALERT_MODAL}
							type={type}
							meetingId={meetingId}
							clearState={clearState}
							isUpdate={hasPreviousRecord}
						/>
					</FormProvider>
				)}
			</ListPage>
		</PageContent>
	)
}
