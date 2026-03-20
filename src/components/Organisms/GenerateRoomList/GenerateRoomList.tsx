'use client'
import dynamic from 'next/dynamic'
import { memo, useState } from 'react'

import { Button, Header, Modal, Select, Text } from '@/components/Atoms'
import type { RoomsPrintProps } from '@/components/Templates'
import { ROOMS_MODAL_TYPE } from '@/constants'

export type SelectedRoomList = {
	modal: ROOMS_MODAL_TYPE | null
}

const RoomsPrint = dynamic(() => import('@/components/Templates').then((mod) => mod.RoomsPrint))

export const GenerateRoomList = memo(({ formattedRooms }: { formattedRooms: RoomsPrintProps['rooms'] }) => {
	const [open, setOpen] = useState<SelectedRoomList>({ modal: null })
	const [listType, setListType] = useState<RoomsPrintProps['listType']>('')

	const handleClose = () => {
		setListType('')
		setOpen({ modal: null })
	}

	const handleOpen = () => {
		setOpen({ modal: ROOMS_MODAL_TYPE.EXPORT })
	}

	return (
		<>
			<Button
				className="min-w-60 items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
				onClick={handleOpen}
				type="button"
			>
				Gerar lista de quartos
			</Button>
			<Modal onOpenChange={handleClose} open={open.modal === ROOMS_MODAL_TYPE.EXPORT}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex w-full flex-col items-center justify-between gap-6">
						<div className="flex flex-col items-center gap-2">
							<Header as="h3" className="text-2xl">
								Selecione o tipo de lista
							</Header>
							<Text className="text-center">
								Selecione uma opção para gerar a lista, ao finalizar clique no botão para baixar o PDF
							</Text>
						</div>
						<Select
							className="w-full"
							onChange={(e) => setListType(e.target.value as RoomsPrintProps['listType'])}
							options={[
								{ label: 'Selecione uma opção', value: '' },
								{ label: 'Lista contínua', value: 'portrait' },
								{ label: 'Um quarto por página', value: 'landscape' },
							]}
							value={listType}
						/>
						{listType && <RoomsPrint handleClose={handleClose} listType={listType} rooms={formattedRooms} />}
					</div>
				</div>
			</Modal>
		</>
	)
})

GenerateRoomList.displayName = 'GenerateRoomList'
