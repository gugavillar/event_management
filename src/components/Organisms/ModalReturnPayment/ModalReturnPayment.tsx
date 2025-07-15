'use client'
import { OctagonAlert } from 'lucide-react'
import { memo } from 'react'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'

type ModalReturnPaymentProps = {
	modalId: string
	modalType: 'participante' | 'voluntário'
	handleReturnPayment: VoidFunction
	isPending: boolean
}

export const ModalReturnPayment = memo(
	({
		modalId,
		modalType,
		isPending,
		handleReturnPayment,
	}: ModalReturnPaymentProps) => {
		const handleClose = () => {
			overlayClose(modalId)
		}

		return (
			<Modal modalId={modalId} handleClose={handleClose}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja confirmar a devolução do pagamento do {modalType}?
							</Header>
							<Text>
								Ao confirmar a devolução do pagamento, todos os registros de
								pagamentos serão removidos e não podem ser recuperados.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleReturnPayment}
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

ModalReturnPayment.displayName = 'ModalReturnPayment'
