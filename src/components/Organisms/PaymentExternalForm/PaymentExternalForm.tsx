'use client'
import PixBR from 'pixbrasil'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

import { Button, Spinner } from '@/components/Atoms'
import { SelectField } from '@/components/Molecules'
import { ExternalParticipantFormProps } from '@/components/Templates'
import { PAYMENT_METHOD_EXTERNAL_OPTIONS, PIX } from '@/constants'

type PaymentExternalFormProps = ExternalParticipantFormProps

export const PaymentExternalForm = ({
	registrationValue,
}: PaymentExternalFormProps) => {
	const [pixValue, setPixValue] = useState<string | null>(null)
	const { watch } = useFormContext()

	const isPixPayment =
		watch('paymentMethod') === PAYMENT_METHOD_EXTERNAL_OPTIONS[1].value

	const isCreditCardPayment =
		watch('paymentMethod') === PAYMENT_METHOD_EXTERNAL_OPTIONS[0].value

	const handleCopyPixValue = () => {
		if (!pixValue) return
		navigator.clipboard.writeText(pixValue)
		toast.success('Pix copiado com sucesso!')
	}

	useEffect(() => {
		if (isPixPayment) {
			const pixPayload = PixBR({ ...PIX, amount: registrationValue })
			return setPixValue(pixPayload)
		}
		setPixValue(null)
	}, [isPixPayment, registrationValue])

	return (
		<div className="flex flex-col space-y-8">
			<SelectField
				fieldName="paymentMethod"
				placeholder="Selecione o tipo de pagamento"
				options={PAYMENT_METHOD_EXTERNAL_OPTIONS}
			>
				Selecione uma das opções abaixo e siga as instruções para concluir o
				pagamento da sua inscrição
			</SelectField>
			<div className="flex flex-col items-center justify-center space-y-12">
				{isPixPayment && (
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
				)}
				{isCreditCardPayment && (
					<div className="space-y-8 text-center">
						<h2 className="text-xl">
							Para realizar o pagamento presencialmente, por favor, dirija-se à
							secretaria da igreja.
						</h2>
						<p>
							A inscrição somente será confirmada após a finalização do
							pagamento.
						</p>
						<p>Recomendamos não deixar para o último momento.</p>
					</div>
				)}
			</div>
		</div>
	)
}
