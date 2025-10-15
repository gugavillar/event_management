'use client'
import Link from 'next/link'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

import { MODALS_IDS, PAYMENT_METHOD_EXTERNAL_OPTIONS, PIX } from '@/constants'
import { currencyValue, formatPhone } from '@/formatters'
import PixBR from 'pixbrasil'
import { ModalPaymentPix } from './ModalPaymentPix'

export type PaymentChoiceProps = {
	paymentMethod: string
	registrationValue?: number
	setPixValue: Dispatch<SetStateAction<string | null>>
	pixValue: string | null
	setCurrentStep: Dispatch<SetStateAction<number>>
}

export const PaymentChoice = ({
	paymentMethod,
	registrationValue,
	pixValue,
	setPixValue,
	setCurrentStep,
}: PaymentChoiceProps) => {
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
				<div className="space-y-8 text-center">
					<h2 className="text-lg font-semibold">
						Ao finalizar, será exibido o QR Code e um botão para copiar o código
						PIX. Use a opção que preferir para pagar.
					</h2>
					<p>
						Após o pagamento, envie o comprovante para a o número{' '}
						<Link
							className="text-blue-500 underline"
							href={`https://wa.me/+55${process.env.NEXT_PUBLIC_PHONE}`}
							target="_blank"
						>
							{formatPhone(process.env.NEXT_PUBLIC_PHONE ?? '')}
						</Link>{' '}
						ou apresente-o no dia do evento.
					</p>
				</div>
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
			<ModalPaymentPix
				modalId={MODALS_IDS.PAYMENT_PIX_MODAL}
				pixValue={pixValue}
				setCurrentStep={setCurrentStep}
			/>
		</div>
	)
}
