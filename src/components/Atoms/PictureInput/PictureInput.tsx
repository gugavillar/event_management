'use client'
import type { UUID } from 'crypto'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { COMMON_PROPS_TOOLTIPS_BUTTON_TABLE } from '@/constants'
import { useSendParticipantPicture } from '@/services/queries/participants'

import { Button } from '../Button'
import { Header } from '../Header'
import { Modal } from '../Modal'
import { Tooltip } from '../Tooltip'
import { compressImage } from './PictureInput.utils'

type PictureInputProps = {
	eventName: string
	eventId: UUID
	participantId: UUID
	participantName: string
}

export const PictureInput = ({ eventId, eventName, participantId, participantName }: PictureInputProps) => {
	const [picture, setPicture] = useState<File | undefined>(undefined)

	const inputRef = useRef<HTMLInputElement>(null)

	const { isPending, sendPicture } = useSendParticipantPicture()

	const handleRemoveFile = () => {
		setPicture(undefined)
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	const image = picture ? URL.createObjectURL(picture) : ''

	const handleSendPicture = async () => {
		if (!picture) return
		await sendPicture(
			{ eventId, eventName, fileType: picture.type, participantId, participantName, picture },
			{
				onError: () => {
					toast.error('Erro ao enviar foto')
				},
				onSuccess: () => {
					toast.success('Foto enviada com sucesso!')
				},
			}
		)
		handleRemoveFile()
	}

	return (
		<>
			<Tooltip
				{...COMMON_PROPS_TOOLTIPS_BUTTON_TABLE}
				trigger={<Camera className="cursor-pointer" onClick={() => inputRef.current?.click()} size={20} />}
			>
				Adicionar foto
			</Tooltip>
			<input
				accept="image/png, image/jpeg, .png, .jpg, .jpeg"
				capture
				className="hidden"
				id="file"
				multiple={false}
				onChange={async (e) => {
					const selectedFile = e.target.files?.[0]
					if (!selectedFile) return
					const compressedFile = await compressImage(selectedFile)
					setPicture(compressedFile)
				}}
				ref={(e) => {
					inputRef.current = e
				}}
				type="file"
			/>
			{picture && (
				<Modal disableClose={isPending} onOpenChange={handleRemoveFile} open>
					<div className="flex flex-col items-center justify-center">
						<div className="flex flex-col items-center justify-between gap-6">
							<div className="space-y-4 text-center">
								<Header as="h3" className="text-2xl">
									Deseja enviar ou tirar outra foto?
								</Header>
								<Image
									alt="picture"
									className="flex max-h-[50dvh] w-full items-center justify-center"
									height={0}
									src={image}
									width={0}
								/>
							</div>
							<div className="flex w-full items-center justify-between gap-x-8">
								<Button
									className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
									disabled={isPending}
									onClick={handleRemoveFile}
									type="button"
								>
									Tirar outra
								</Button>
								<Button
									className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
									disabled={isPending}
									isLoading={isPending}
									onClick={handleSendPicture}
								>
									Enviar
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}
