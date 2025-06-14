'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { BedSingle, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Field } from '@/components/Atoms'
import { ComboBox } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import {
	RoomSchema,
	RoomSchemaType,
} from '@/components/Organisms/RoomDrawer/RoomDrawer.schema'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetRoomByEventId } from '@/services/queries/rooms'
import { RoomAPI } from '@/services/queries/rooms/rooms.types'

import { Content, formatTableData } from './Rooms.utils'

const RoomDeleteModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.RoomDeleteModal),
)

const RoomDrawer = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.RoomDrawer),
)

export const Rooms = ({ eventId }: { eventId?: string }) => {
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
		mode: 'onChange',
		resolver: zodResolver(RoomSchema),
		defaultValues: {
			eventId: '',
			roomNumber: '',
			members: [{ type: '', member: '' }],
		},
	})

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
		[],
	)

	const formattedRooms = formatTableData(rooms)

	return (
		<PageContent subheadingPage="Listagem de grupos">
			<div className="flex flex-col items-center justify-end gap-5 md:flex-row">
				<Button
					type="button"
					onClick={() => handleOpenDrawerToCreateOrEditRoom()}
					leftIcon={<BedSingle />}
					className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				>
					Criar um novo quarto
				</Button>
			</div>
			<ListPage
				className="w-full lg:max-w-full"
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={roomEventId}
							setSelectedValue={setRoomEventId}
							lastItemRef={lastItemRef}
						/>
						<Field
							placeholder="Encontrar membro"
							rightIcon={<Search size={24} />}
							className="ps-11"
							value={searchMemberRoom}
							disabled={!roomEventId}
							onChange={(event) => setSearchMemberRoom(event.target.value)}
						/>
					</>
				}
			>
				{Content(
					roomEventId,
					isLoading,
					formattedRooms,
					handleOpenModalToDeleteRoom,
					handleOpenDrawerToCreateOrEditRoom,
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
