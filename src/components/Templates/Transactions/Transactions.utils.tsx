import { BanknoteArrowDown, BanknoteArrowUp, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Spinner, Tooltip } from '@/components/Atoms'
import {
	amountType,
	transactionType,
} from '@/components/Organisms/TransactionDrawer/TransactionDrawer.utils'
import { TransactionsType } from '@/constants'
import { currencyValue } from '@/formatters'
import type { TransactionsAPI } from '@/services/queries/transactions/transactions.types'
import { format } from 'date-fns'

export const TransactionCardInfo = ({
	isFetching,
	selectedEvent,
	content,
	search,
}: {
	selectedEvent: string
	isFetching: boolean
	content: ReactNode
	search: string
}) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					As transações são exibidas conforme o evento selecionado. Escolha um
					para continuar.
				</p>
			</div>
		)
	}

	if (isFetching && !search) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
				<Spinner />
			</div>
		)
	}

	return content
}

export const HEADER_LABELS = [
	{
		accessor: 'description',
		label: 'Descrição',
	},
	{
		accessor: 'type',
		label: 'Tipo',
	},
	{
		accessor: 'amountType',
		label: 'Transação',
	},
	{
		accessor: 'amount',
		label: 'Valor',
	},
	{
		accessor: 'date',
		label: 'Data',
	},
	{
		accessor: 'action',
		label: '',
	},
]

export const formatTableData = (
	data: Array<TransactionsAPI> | undefined,
	handleRemoveDonation: (id: TransactionsAPI['id']) => void
) => {
	if (!data) return []

	return data.map((transaction) => {
		const type = transaction.type
		return {
			...transaction,
			action: (
				<div className="hs-tooltip">
					<Trash2
						className="cursor-pointer"
						onClick={() => handleRemoveDonation(transaction.id)}
						size={18}
					/>
					<Tooltip>Excluir</Tooltip>
				</div>
			),
			amount: (
				<span
					className={twMerge(
						'flex items-center gap-2',
						type === TransactionsType.INCOME ? 'text-green-500' : 'text-red-500'
					)}
				>
					{type === TransactionsType.INCOME ? (
						<BanknoteArrowDown />
					) : (
						<BanknoteArrowUp />
					)}
					{currencyValue(Number(transaction.amount))}
				</span>
			),
			amountType: amountType[transaction.amountType],
			date: format(transaction.date, 'dd/MM/yyyy'),
			event: transaction.event.name,
			type: transactionType[transaction.type],
		}
	})
}
