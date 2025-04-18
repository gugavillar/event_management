'use client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteParticipant } from '@/services/queries/participants'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

type ParticipantCheckInModalProps = {
	modalId: string
	selectedParticipant: ParticipantsFromAPI['id'] | null
	setSelectedParticipant: Dispatch<
		SetStateAction<ParticipantsFromAPI['id'] | null>
	>
}

export const ParticipantCheckInModal = ({
	modalId,
	selectedParticipant,
	setSelectedParticipant,
}: ParticipantCheckInModalProps) => {
	const { remove, isPending } = useDeleteParticipant()

	const handleCheckInParticipant = async () => {
		if (!selectedParticipant) return

		await remove(selectedParticipant, {
			onSuccess: () => {
				setSelectedParticipant(null)
				toast.success('Participante excluído com sucesso!')
				overlayClose(modalId)
			},
			onError: () => toast.error('Erro ao excluir participante'),
		})
	}

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedParticipant(null)}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<IoMdAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Está tudo certo com este participante?
						</Header>
						<Text>
							Confirme a presença ou marque a desistência, conforme combinado
							com ele(a)
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							disabled={isPending}
						>
							Desistir
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={handleCheckInParticipant}
							isLoading={isPending}
							disabled={isPending}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
