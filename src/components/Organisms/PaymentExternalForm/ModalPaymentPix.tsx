'use client'
import copy from 'copy-to-clipboard'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

import { Button, Modal, Spinner } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { formatPhone } from '@/formatters'

import { type PaymentChoiceProps } from './PaymentChoice'

type ModalPaymentPixProps = Pick<
	PaymentChoiceProps,
	'pixValue' | 'setCurrentStep'
> & {
	modalId: string
}

export const ModalPaymentPix = ({
	pixValue,
	modalId,
	setCurrentStep,
}: ModalPaymentPixProps) => {
	const { reset } = useFormContext()
	const handleCopyPixValue = async () => {
		if (!pixValue) return

		const success = copy(pixValue)
		if (success) {
			return toast.success('PIX copiado com sucesso!')
		}

		toast.error('Erro ao copiar o PIX')
	}

	const handleClose = () => {
		setCurrentStep(0)
		overlayClose(modalId)
		reset()
		toast.success('Inscrição realizada com sucesso!')
	}

	return (
		<Modal modalId={modalId} isStatic handleClose={handleClose}>
			<div className="flex flex-col items-center justify-center space-y-6">
				<div className="space-y-2.5 text-center">
					<h2 className="text-lg font-semibold">
						Para realizar o pagamento, utilize o QR Code abaixo ou copie o
						código PIX.
					</h2>
					<p>
						Após o pagamento, envie o comprovante para a o número{' '}
						<Link
							target="_blank"
							href={`https://wa.me/+55${process.env.NEXT_PUBLIC_PHONE}`}
							className="text-blue-500 underline"
						>
							{formatPhone(process.env.NEXT_PUBLIC_PHONE ?? '')}
						</Link>{' '}
						ou apresente-o no dia do evento.
					</p>
				</div>
				{pixValue ? (
					<>
						<QRCode value={pixValue} size={200} />
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:w-2/5"
							onClick={handleCopyPixValue}
							disabled={!pixValue}
						>
							Copiar código
						</Button>
					</>
				) : (
					<Spinner className="size-16" />
				)}
			</div>
		</Modal>
	)
}
