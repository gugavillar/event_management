'use client'
import { OctagonAlert } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useUpdateInterestedParticipant } from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { generateToastError } from '@/utils/errors'

type InterestedModalToParticipantProps = {
	modalId: string
	selectedParticipant: ParticipantsAPI['id'] | null
	setSelectedParticipant: Dispatch<SetStateAction<ParticipantsAPI['id'] | null>>
	interested: boolean
}

export const InterestedModalToParticipant = memo(
	({
		modalId,
		selectedParticipant,
		setSelectedParticipant,
		interested,
	}: InterestedModalToParticipantProps) => {
		const { update, isPending } = useUpdateInterestedParticipant()

		const handleMoveParticipant = async () => {
			if (!selectedParticipant) return

			await update(
				{ participantId: selectedParticipant, interested },
				{
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Participante movido com sucesso!')
						overlayClose(modalId)
					},
					onError: (error) =>
						generateToastError(error, 'Erro ao atualizar participante'),
				},
			)
		}

		return (
			<Modal modalId={modalId} handleClose={() => setSelectedParticipant(null)}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								{interested
									? 'Você deseja adicionar na lista de interessados?'
									: 'Você deseja confirmar participação?'}
							</Header>
							<Text>
								{interested
									? 'Ao confirmar este participante será adicionado na lista de interessados'
									: 'Ao confirmar este participante será adicionado na lista de participantes'}
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
								onClick={() => setSelectedParticipant(null)}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleMoveParticipant}
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
	},
)

InterestedModalToParticipant.displayName = 'InterestedModalToParticipant'
