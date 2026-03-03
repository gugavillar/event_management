'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedParticipant } from '@/components/Templates'
import { CHECK_IN_STATUS } from '@/constants'
import { useUpdateCheckInParticipant } from '@/services/queries/participants'
import { generateToastError } from '@/utils/errors'

type ParticipantCheckInModalProps = {
	selectedParticipant: SelectedParticipant | null
	setSelectedParticipant: Dispatch<SetStateAction<SelectedParticipant | null>>
}

export const ParticipantCheckInModal = memo(
	({ selectedParticipant, setSelectedParticipant }: ParticipantCheckInModalProps) => {
		const { update, isPending } = useUpdateCheckInParticipant()

		const handleCheckInParticipant = async (status: CHECK_IN_STATUS) => {
			if (!selectedParticipant) return

			await update(
				{ participantId: selectedParticipant.id, status },
				{
					onError: (error) => generateToastError(error, 'Erro ao marcar status do participante'),
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Participante marcado com o status selecionado!')
					},
				}
			)
		}

		const handleClose = () => {
			setSelectedParticipant(null)
		}

		return (
			<Modal onOpenChange={handleClose} open={selectedParticipant?.modal === 'check-in'}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert className="text-amber-300" size={64} />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Está tudo certo com este participante?
							</Header>
							<Text>Confirme a presença ou marque a desistência, conforme combinado com ele(a)</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								className="w-full items-center justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={() => handleCheckInParticipant(CHECK_IN_STATUS.WITHDREW)}
								type="button"
							>
								Desistir
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={() => handleCheckInParticipant(CHECK_IN_STATUS.CONFIRMED)}
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

ParticipantCheckInModal.displayName = 'ParticipantCheckInModal'
