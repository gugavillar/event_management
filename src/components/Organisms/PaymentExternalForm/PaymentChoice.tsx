'use client'
import copy from 'copy-to-clipboard'
import PixBR from 'pixbrasil'
import { Dispatch, SetStateAction, useEffect } from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

import { Button, Spinner } from '@/components/Atoms'
import { PAYMENT_METHOD_EXTERNAL_OPTIONS, PIX } from '@/constants'
import { currencyValue } from '@/formatters'

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
	const handleCopyPixValue = async () => {
		if (!pixValue) return

		const success = copy(pixValue)
		if (success) {
			return toast.success('PIX copiado com sucesso!')
		}

		toast.error('Erro ao copiar o PIX')
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
		<div className="flex flex-col items-center justify-center space-y-8">
			<h3 className="text-lg">
				Valor da inscrição:{' '}
				<span className="font-semibold">
					{currencyValue(registrationValue as number)}
				</span>
			</h3>
			{paymentMethod === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value ? (
				<>
					<div className="space-y-2.5 text-center">
						<h2 className="text-lg font-semibold">
							Para realizar o pagamento, utilize o QR Code abaixo ou copie o
							código PIX.
						</h2>
						<p>
							Após o pagamento, envie o comprovante para a secretaria da igreja
							ou apresente-o no dia do evento.
						</p>
						<p>
							<span className="font-semibold">Importante:</span> não se esqueça
							de concluir sua inscrição após o envio do comprovante.
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
				</>
			) : (
				<div className="space-y-8 text-center">
					<h2 className="text-lg font-semibold">
						Para pagamentos em dinheiro ou cartão, dirija-se à secretaria da
						igreja.
					</h2>
					<p>
						Recomendamos que não deixe para o último momento para evitar
						imprevistos.
					</p>
				</div>
			)}
		</div>
	)
}
