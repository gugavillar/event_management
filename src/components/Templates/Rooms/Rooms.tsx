'use client'
import { BedSingle, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { Button, Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import {
	RoomSchema,
	type RoomSchemaType,
} from '@/components/Organisms/RoomDrawer/RoomDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetRoomByEventId } from '@/services/queries/rooms'
import type { RoomAPI } from '@/services/queries/rooms/rooms.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Content, formatTableData } from './Rooms.utils'

const RoomDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.RoomDeleteModal)
)

const RoomDrawer = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.RoomDrawer)
)

const DownloadPDF = dynamic(() =>
	import('./RoomsPrint').then((mod) => mod.DownloadPDF)
)

export const Rooms = ({ eventId }: { eventId: string }) => {
	const [selectedRoom, setSelectedRoom] = useState<RoomAPI['id'] | null>(null)

	const {
		data: rooms,
		roomEventId,
		setRoomEventId,
		isLoading,
		searchMemberRoom,
		setSearchMemberRoom,
	} = useGetRoomByEventId(eventId)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

	const methods = useForm<RoomSchemaType>({
		defaultValues: {
			eventId: '',
			members: [{ member: '', type: '' }],
			roomNumber: '',
		},
		mode: 'onChange',
		resolver: zodResolver(RoomSchema),
	})

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

	const handleOpenModalToDeleteRoom = useCallback((id: RoomAPI['id']) => {
		setSelectedRoom(id)
		overlayOpen(MODALS_IDS.ROOM_REMOVE_MODAL)
	}, [])

	const handleOpenDrawerToCreateOrEditRoom = useCallback(
		(id?: RoomAPI['id']) => {
			if (id) {
				setSelectedRoom(id)
			} else {
				setSelectedRoom(null)
			}
			overlayOpen(MODALS_IDS.ROOM_DRAWER)
		},
		[]
	)

	const formattedRooms = formatTableData(rooms)

	return (
		<PageContent subheadingPage="Listagem de grupos">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<DownloadPDF rooms={formattedRooms} />
				<Button
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					leftIcon={<BedSingle />}
					onClick={() => handleOpenDrawerToCreateOrEditRoom()}
					type="button"
				>
					Criar um novo quarto
				</Button>
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
							placeholder="Selecione um evento"
							selectedValue={roomEventId}
							setSelectedValue={setRoomEventId}
						/>
						<Field
							className="ps-11"
							disabled={!roomEventId}
							onChange={(event) => setSearchMemberRoom(event.target.value)}
							placeholder="Encontrar membro"
							rightIcon={<Search size={24} />}
							value={searchMemberRoom}
						/>
					</>
				}
			>
				{Content(
					roomEventId,
					isLoading,
					formattedRooms,
					handleOpenModalToDeleteRoom,
					handleOpenDrawerToCreateOrEditRoom
				)}
			</ListPage>
			<FormProvider {...methods}>
				<RoomDrawer
					drawerId={MODALS_IDS.ROOM_DRAWER}
					selectedRoom={selectedRoom}
					setSelectedRoom={setSelectedRoom}
				/>
			</FormProvider>
			<RoomDeleteModal
				modalId={MODALS_IDS.ROOM_REMOVE_MODAL}
				selectedRoom={selectedRoom}
				setSelectedRoom={setSelectedRoom}
			/>
		</PageContent>
	)
}
