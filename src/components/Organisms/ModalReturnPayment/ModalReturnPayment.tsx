'use client'
import { OctagonAlert } from 'lucide-react'
import { type Dispatch, memo, type SetStateAction } from 'react'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import type { SelectedParticipant, SelectedVolunteer } from '@/components/Templates'
import { PARTICIPANT_MODAL_TYPE, VOLUNTEER_MODAL_TYPE } from '@/constants'

type BaseReturnPaymentProps = {
	handleReturnPayment: VoidFunction
	isPending: boolean
}

type ModalReturnPaymentProps =
	| (BaseReturnPaymentProps & {
			modalType: 'participante'
			selected: SelectedParticipant | null
			setSelected: Dispatch<SetStateAction<SelectedParticipant | null>>
	  })
	| (BaseReturnPaymentProps & {
			modalType: 'voluntário'
			selected: SelectedVolunteer | null
			setSelected: Dispatch<SetStateAction<SelectedVolunteer | null>>
	  })

export const ModalReturnPayment = memo(
	({ modalType, isPending, handleReturnPayment, selected, setSelected }: ModalReturnPaymentProps) => {
		const handleCloseModalReturnPayment = () => {
			setSelected(null)
		}

		return (
			<Modal
				onOpenChange={handleCloseModalReturnPayment}
				open={
					selected?.modal === PARTICIPANT_MODAL_TYPE.RETURN_PAYMENT ||
					selected?.modal === VOLUNTEER_MODAL_TYPE.RETURN_PAYMENT
				}
			>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert className="text-amber-300" size={64} />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja confirmar a devolução do pagamento do {modalType}?
							</Header>
							<Text>
								Ao confirmar a devolução do pagamento, todos os registros de pagamentos serão removidos e não podem ser
								recuperados.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								disabled={isPending}
								onClick={handleCloseModalReturnPayment}
								type="button"
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								disabled={isPending}
								isLoading={isPending}
								onClick={handleReturnPayment}
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

ModalReturnPayment.displayName = 'ModalReturnPayment'
