'use client'
import PixBR from 'pixbrasil'
import { Dispatch, SetStateAction, useEffect } from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

import { Button, Spinner } from '@/components/Atoms'
import { PAYMENT_METHOD_EXTERNAL_OPTIONS, PIX } from '@/constants'

type PaymentChoiceProps = {
	paymentMethod: string
	registrationValue?: number
	setPixValue: Dispatch<SetStateAction<string | null>>
	pixValue: string | null
}

export const PaymentChoice = ({
	paymentMethod,
	registrationValue,
	setPixValue,
	pixValue,
}: PaymentChoiceProps) => {
	const handleCopyPixValue = () => {
		if (!pixValue) return
		navigator.clipboard.writeText(pixValue)
		toast.success('Pix copiado com sucesso!')
	}

	useEffect(() => {
		if (paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value) {
			const pixPayload = PixBR({ ...PIX, amount: registrationValue })
			return setPixValue(pixPayload)
		}
		setPixValue(null)
	}, [paymentMethod, registrationValue, setPixValue])

	if (!paymentMethod) return null

	return (
		<div className="flex flex-col items-center justify-center space-y-12">
			{paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value ? (
				<>
					<div className="text-center">
						<h2 className="text-xl">
							Para efetuar o pagamento, utilize o QR Code abaixo ou copie o
							código PIX
						</h2>
						<p>
							Após a confirmação do pagamento, envie o comprovante para a
							secretaria da igreja ou apresente-o no dia do evento.
						</p>
					</div>
					{pixValue ? (
						<>
							<QRCode value={pixValue} size={220} />
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
				</>
			) : (
				<div className="space-y-8 text-center">
					<h2 className="text-xl">
						Para realizar o pagamento no dinheiro ou cartão, por favor,
						dirija-se à secretaria da igreja.
					</h2>
					<p>Recomendamos não deixar para o último momento.</p>
				</div>
			)}
		</div>
	)
}
