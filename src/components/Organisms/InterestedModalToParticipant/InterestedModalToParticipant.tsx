'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedParticipant } from '@/components/Templates'
import { PARTICIPANT_MODAL_TYPE } from '@/constants'
import { useUpdateInterestedParticipant } from '@/services/queries/participants'
import { generateToastError } from '@/utils/errors'

type InterestedModalToParticipantProps = {
	selectedParticipant: SelectedParticipant | null
	setSelectedParticipant: Dispatch<SetStateAction<SelectedParticipant | null>>
	interested: boolean
}

export const InterestedModalToParticipant = memo(
	({ selectedParticipant, setSelectedParticipant, interested }: InterestedModalToParticipantProps) => {
		const { update, isPending } = useUpdateInterestedParticipant()

		const handleMoveParticipant = async () => {
			if (!selectedParticipant) return

			await update(
				{ interested, participantId: selectedParticipant.id },
				{
					onError: (error) => generateToastError(error, 'Erro ao atualizar participante'),
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Participante movido com sucesso!')
					},
				}
			)
		}

		const handleCloseInterestedModalToParticipant = () => {
			setSelectedParticipant(null)
		}

		return (
			<Modal
				onOpenChange={handleCloseInterestedModalToParticipant}
				open={selectedParticipant?.modal === PARTICIPANT_MODAL_TYPE.INTERESTED}
			>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert className="text-amber-300" size={64} />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								{interested ? 'Você deseja adicionar na lista de interessados?' : 'Você deseja confirmar participação?'}
							</Header>
							<Text>
								{interested
									? 'Ao confirmar este participante será adicionado na lista de interessados'
									: 'Ao confirmar este participante será adicionado na lista de participantes'}
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								disabled={isPending}
								onClick={handleCloseInterestedModalToParticipant}
								type="button"
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={handleMoveParticipant}
							>
								Confirmar
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
)

InterestedModalToParticipant.displayName = 'InterestedModalToParticipant'
