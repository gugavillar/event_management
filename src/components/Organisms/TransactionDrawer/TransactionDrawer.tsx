'use client'
import { memo } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	CurrencyInputField,
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatDateToSendToApi, removeCurrencyFormat } from '@/formatters'
import { useCreateTransaction } from '@/services/queries/transactions/hooks'
import { TransactionsAPI } from '@/services/queries/transactions/transactions.types'
import { generateToastError } from '@/utils/errors'

import { TransactionType } from './TransactionDrawer.schema'
import { AMOUNT_TYPE, TRANSACTION_TYPE } from './TransactionDrawer.utils'

type TransactionDrawerProps = {
	drawerId: string
	eventId: string
}

export const TransactionDrawer = memo(
	({ drawerId, eventId }: TransactionDrawerProps) => {
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
				type: values.type as TransactionsAPI['type'],
				date: formatDateToSendToApi(values.date),
				eventId,
			}

			await create(formatValues, {
				onSuccess: () => {
					reset()
					toast.success('Transação criada com sucesso!')
					overlayClose(drawerId)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao criar transação'),
			})
		}

		const handleClose = () => {
			reset()
		}

		return (
			<Drawer
				drawerId={drawerId}
				headingTitle="Dados da transação"
				handleClose={handleClose}
			>
				<DrawerBody>
					<SelectField
						fieldName="type"
						placeholder="Selecione uma opção"
						options={TRANSACTION_TYPE}
					>
						Tipo
					</SelectField>
					<CurrencyInputField type="tel" fieldName="amount">
						Valor
					</CurrencyInputField>
					<SelectField
						fieldName="amountType"
						placeholder="Selecione uma opção"
						options={AMOUNT_TYPE}
					>
						Transação
					</SelectField>
					<InputField fieldName="description">Descrição</InputField>
					<MaskedInputField format="##/##/####" fieldName="date">
						Data
					</MaskedInputField>
				</DrawerBody>
				<DrawerFooter>
					<Button
						className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						onClick={handleSubmit(handleSubmitForm)}
						type="submit"
						isLoading={isPending}
						disabled={!isValid || !isDirty}
					>
						Salvar
					</Button>
				</DrawerFooter>
			</Drawer>
		)
	},
)

TransactionDrawer.displayName = 'TransactionDrawer'
