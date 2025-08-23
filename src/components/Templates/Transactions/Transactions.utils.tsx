import { format } from 'date-fns'
import { BanknoteArrowDown, BanknoteArrowUp, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Spinner, Tooltip } from '@/components/Atoms'
import {
	amountType,
	transactionType,
} from '@/components/Organisms/TransactionDrawer/TransactionDrawer.utils'
import { currencyValue } from '@/formatters'
import { TransactionsAPI } from '@/services/queries/transactions/transactions.types'

export const TransactionCardInfo = ({
	isFetching,
	payments,
	selectedEvent,
}: {
	selectedEvent: string
	isFetching: boolean
	payments: Array<any>
}) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					Os registros são exibidos conforme o evento selecionado. Escolha um
					para continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !payments?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum registro encontrado
				</h3>
				<p className="mt-2 text-gray-500">
					Nenhum registro foi criado para o evento selecionado.
				</p>
			</div>
		)
	}

	if (isFetching) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
				<Spinner />
			</div>
		)
	}
}

export const HEADER_LABELS = [
	{
		label: 'Descrição',
		accessor: 'description',
	},
	{
		label: 'Tipo',
		accessor: 'type',
	},
	{
		label: 'Transação',
		accessor: 'amountType',
	},
	{
		label: 'Valor',
		accessor: 'amount',
	},
	{
		label: 'Data',
		accessor: 'date',
	},
	{
		label: '',
		accessor: 'action',
	},
]

export const formatTableData = (
	data: Array<TransactionsAPI> | undefined,
	handleRemoveDonation: (id: TransactionsAPI['id']) => void,
) => {
	if (!data) return []

	return data.map((transaction) => {
		const type = transaction.type
		return {
			...transaction,
			event: transaction.event.name,
			amount: (
				<span
					className={twMerge(
						'flex items-center gap-2',
						type === 'INCOME' ? 'text-green-500' : 'text-red-500',
					)}
				>
					{type === 'INCOME' ? <BanknoteArrowDown /> : <BanknoteArrowUp />}
					{currencyValue(Number(transaction.amount))}
				</span>
			),
			type: transactionType[transaction.type],
			amountType: amountType[transaction.amountType],
			date: format(transaction.date, 'dd/MM/yyyy'),
			action: (
				<div className="hs-tooltip">
					<Trash2
						className="cursor-pointer"
						size={18}
						onClick={() => handleRemoveDonation(transaction.id)}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			),
		}
	})
}
