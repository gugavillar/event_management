'use client'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { FormProvider, useForm } from 'react-hook-form'
import { MeetingSchema, type MeetingSchemaType } from './Meetings.schema'
import { formatTableData, HEADER_LABELS } from './Meetings.utils'

export const Meetings = () => {
	const [type, setType] = useState<'draft' | 'send'>('send')
	const [search, setSearch] = useState('')
	const methods = useForm<MeetingSchemaType>({
		defaultValues: {
			justification: [],
			presence: [],
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
		'id'
	)

	const lastItemRef = useInfiniteScrollObserver({
		fetchNextPage,
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
	})

	const formattedMeetings = formatterFieldSelectValues(
		meetings ?? [],
		'title',
		'id'
	)

	const debounceSearch = useDebounce(search, 500)

	let formattedPresenceList = formatTableData(meeting?.meeting, methods.watch)
	formattedPresenceList = formattedPresenceList.filter((item) =>
		item.name.toLowerCase().includes(debounceSearch.toLowerCase())
	)

	const hasPreviousRecord =
		!!meeting?.presenceResponse.justification?.length &&
		!!meeting?.presenceResponse.presence?.length

	useEffect(() => {
		const storedData = localStorage.getItem(meetingId)

		if (storedData && !hasPreviousRecord) {
			const parsedData = JSON.parse(storedData)
			const isSameMeeting = meetingId === parsedData.meetingId

			if (!isSameMeeting || !meeting?.meeting) return

			const presenceObject = Object.fromEntries(
				parsedData.presence.map((item: Record<string, boolean>) => {
					const [id, value] = Object.entries(item)[0]
					return [id, value]
				})
			)

			const justificationObject = Object.fromEntries(
				parsedData.justification.map((item: Record<string, boolean>) => {
					const [id, value] = Object.entries(item)[0]
					return [id, value]
				})
			)

			const justifications = meeting?.meeting.volunteers.map((volunteer) => ({
				[volunteer.id]: justificationObject[volunteer.id] ?? false,
			}))
			const presences = meeting?.meeting.volunteers.map((volunteer) => ({
				[volunteer.id]: presenceObject[volunteer.id] ?? false,
			}))

			methods.reset(
				{ justification: justifications, presence: presences },
				{ keepDefaultValues: true }
			)
		}
	}, [hasPreviousRecord, meeting?.meeting, meetingId, methods])

	useEffect(() => {
		if (!hasPreviousRecord) return

		methods.reset(
			{
				justification: meeting?.presenceResponse.justification,
				presence: meeting?.presenceResponse.presence,
			},
			{ keepDefaultValues: true }
		)
	}, [
		hasPreviousRecord,
		meeting?.presenceResponse.justification,
		meeting?.presenceResponse.presence,
		methods,
	])

	useEffect(() => {
		if (!eventId) return
		setMeetingId('')
	}, [eventId, setMeetingId])

	return (
		<PageContent pageTitle="Reuniões" subheadingPage="Lista de presença">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<ExportMeetingButton />
				<CreateMeetingButton />
			</div>
			<ListPage
				className="w-full flex-col md:flex-row lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							lastItemRef={lastItemRef}
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
						/>
						<Select
							disabled={!eventId || !formattedMeetings?.length}
							onChange={(e) => {
								methods.reset()
								setMeetingId(e.target.value)
							}}
							options={formattedMeetings}
							placeholder="Selecione a reunião"
							value={meetingId}
						/>
						<Field
							className="ps-11"
							disabled={!eventId || !formattedMeetings?.length}
							onChange={(event) => setSearch?.(event.target.value)}
							placeholder="Encontrar voluntário"
							rightIcon={<Search size={24} />}
							value={search}
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
							bodyData={formattedPresenceList}
							headerLabels={HEADER_LABELS}
							isLoading={isLoading}
						/>
						<div className="mt-6 flex flex-col items-center justify-end gap-5 md:flex-row">
							<Button
								className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={hasPreviousRecord || !meetingId}
								onClick={() => handleOpenAlert('draft')}
								type="button"
							>
								Salvar rascunho
							</Button>
							<Button
								className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={!meetingId}
								onClick={() => handleOpenAlert('send')}
								type="button"
							>
								Enviar presenças
							</Button>
						</div>
						<MeetingAlertModal
							clearState={clearState}
							hasPreviousRecord={hasPreviousRecord}
							isUpdate={hasPreviousRecord}
							meetingId={meetingId}
							modalId={MODALS_IDS.MEETING_ALERT_MODAL}
							type={type}
						/>
					</FormProvider>
				)}
			</ListPage>
		</PageContent>
	)
}
