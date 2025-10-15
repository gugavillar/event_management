'use client'
import { memo } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import { CurrencyInputField, InputField, MaskedInputField, SelectField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatDateToSendToApi, removeCurrencyFormat } from '@/formatters'
import { useCreateTransaction } from '@/services/queries/transactions/hooks'
import type { TransactionsAPI } from '@/services/queries/transactions/transactions.types'
import { generateToastError } from '@/utils/errors'

import type { TransactionType } from './TransactionDrawer.schema'
import { AMOUNT_TYPE, TRANSACTION_TYPE } from './TransactionDrawer.utils'

type TransactionDrawerProps = {
	drawerId: string
	eventId: string
}

export const TransactionDrawer = memo(({ drawerId, eventId }: TransactionDrawerProps) => {
	const { create, isPending } = useCreateTransaction()
	const {
		handleSubmit,
		reset,
		formState: { isValid, isDirty },
	} = useFormContext<TransactionType>()

	const handleSubmitForm: SubmitHandler<TransactionType> = async (values) => {
		if (!values) return

		const formatValues = {
			...values,
			amount: Number(removeCurrencyFormat(values.amount)),
			amountType: values.amountType as TransactionsAPI['amountType'],
			date: formatDateToSendToApi(values.date),
			eventId,
			type: values.type as TransactionsAPI['type'],
		}

		await create(formatValues, {
			onError: (error) => generateToastError(error, 'Erro ao criar transação'),
			onSuccess: () => {
				reset()
				toast.success('Transação criada com sucesso!')
				overlayClose(drawerId)
			},
		})
	}

	const handleClose = () => {
		reset()
	}

	return (
		<Drawer drawerId={drawerId} handleClose={handleClose} headingTitle="Dados da transação">
			<DrawerBody>
				<SelectField fieldName="type" options={TRANSACTION_TYPE} placeholder="Selecione uma opção">
					Tipo
				</SelectField>
				<CurrencyInputField fieldName="amount" type="tel">
					Valor
				</CurrencyInputField>
				<SelectField fieldName="amountType" options={AMOUNT_TYPE} placeholder="Selecione uma opção">
					Transação
				</SelectField>
				<InputField fieldName="description">Descrição</InputField>
				<MaskedInputField fieldName="date" format="##/##/####">
					Data
				</MaskedInputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					disabled={!isValid || !isDirty}
					isLoading={isPending}
					onClick={handleSubmit(handleSubmitForm)}
					type="submit"
				>
					Salvar
				</Button>
			</DrawerFooter>
		</Drawer>
	)
})

TransactionDrawer.displayName = 'TransactionDrawer'
