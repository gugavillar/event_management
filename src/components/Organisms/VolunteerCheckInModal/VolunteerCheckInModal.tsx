'use client'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { CHECK_IN_STATUS, overlayClose } from '@/constants'
import { useUpdateCheckInVolunteer } from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

type VolunteerCheckInModalProps = {
	modalId: string
	selectedVolunteer: VolunteersAPI['id'] | null
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const VolunteerCheckInModal = ({
	modalId,
	selectedVolunteer,
	setSelectedVolunteer,
}: VolunteerCheckInModalProps) => {
	const { update, isPending } = useUpdateCheckInVolunteer()

	const handleCheckInVolunteer = async (status: CHECK_IN_STATUS) => {
		if (!selectedVolunteer) return

		await update(
			{ volunteerId: selectedVolunteer, status },
			{
				onSuccess: () => {
					setSelectedVolunteer(null)
					toast.success('Voluntário marcado com o status selecionado!')
					overlayClose(modalId)
				},
				onError: () => toast.error('Erro ao marcar status do voluntário'),
			},
		)
	}

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedVolunteer(null)}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<IoMdAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Está tudo certo com este voluntário?
						</Header>
						<Text>
							Confirme a presença ou marque a desistência, conforme combinado
							com ele(a)
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-slate-800"
							disabled={isPending}
							isLoading={isPending}
							onClick={() => handleCheckInVolunteer(CHECK_IN_STATUS.WITHDREW)}
						>
							Desistir
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={() => handleCheckInVolunteer(CHECK_IN_STATUS.CONFIRMED)}
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
