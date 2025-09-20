'use client'

import { useState } from 'react'

import { Pagination } from '@/components/Atoms'
import {
	ComboBox,
	ExportTransactionsButton,
	ListManager,
	TransactionCard,
} from '@/components/Molecules'
import {
	CreateTransaction,
	ListPage,
	TransactionDeleteModal,
} from '@/components/Organisms'
import { MODALS_IDS, overlayOpen } from '@/constants'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import { useGetTransactions } from '@/services/queries/transactions/hooks'
import { TransactionsAPI } from '@/services/queries/transactions/transactions.types'

import {
	formatTableData,
	HEADER_LABELS,
	TransactionCardInfo,
} from './Transactions.utils'

export const Transaction = () => {
	const [selectedTransaction, setSelectedTransaction] = useState<
		TransactionsAPI['id'] | null
	>(null)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		eventId,
		isLoading,
		setEventId,
		data,
		page,
		setPage,
		searchTransaction,
		setSearchTransaction,
	} = useGetTransactions()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
	)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleRemoveTransaction = (id: TransactionsAPI['id']) => {
		setSelectedTransaction(id)
		overlayOpen(MODALS_IDS.TRANSACTION_REMOVE_MODAL)
	}

	const formatData = formatTableData(data?.data, handleRemoveTransaction)

	const hasMoreThanOnePage = !!data?.totalPages && data.totalPages > 1

	const balanceAmount =
		(data?.sumOfAllIncome ?? 0) - (data?.sumOfAllOutcome ?? 0)
	const balanceAmountCash =
		(data?.totalOfAccountAndCash?.totalCashIncome ?? 0) -
		(data?.totalOfAccountAndCash?.totalCashOutcome ?? 0)
	const balanceAmountAccount =
		(data?.totalOfAccountAndCash?.totalAccountIncome ?? 0) -
		(data?.totalOfAccountAndCash?.totalAccountOutcome ?? 0)

	const eventName = formattedEvents.find(
		(event) => event.customProps.value === eventId,
	)?.customProps.label

	return (
		<>
			<div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-end">
				<ComboBox
					className="max-w-[25.875rem]"
					keyOptionLabel="label"
					keyOptionValue="value"
					options={formattedEvents}
					selectedValue={eventId}
					setSelectedValue={setEventId}
					lastItemRef={lastItemRef}
					label="Selecione o evento"
				/>
				{eventId && (
					<div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-end">
						<ExportTransactionsButton
							eventId={eventId}
							eventName={eventName}
							transactionLength={data?.data?.length}
						/>
						<CreateTransaction eventId={eventId} />
					</div>
				)}
			</div>
			<TransactionCardInfo
				isFetching={isLoading}
				selectedEvent={eventId}
				search={searchTransaction}
				content={
					<>
						<section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
							<TransactionCard
								headerText="Entradas"
								value={data?.sumOfAllIncome ?? 0}
								headerClassName="bg-green-100"
								isLoading={isLoading}
							/>
							<TransactionCard
								headerText="Saídas"
								value={data?.sumOfAllOutcome ?? 0}
								headerClassName="bg-red-100"
								isLoading={isLoading}
							/>
							<TransactionCard
								headerText="Saldo"
								value={balanceAmount}
								isShowAccounts
								amountAccount={balanceAmountAccount}
								amountCash={balanceAmountCash}
								isLoading={isLoading}
							/>
						</section>
						<ListPage
							placeholderField="Encontrar uma transação"
							search={searchTransaction}
							setSearch={setSearchTransaction}
						>
							<ListManager
								bodyData={formatData}
								headerLabels={HEADER_LABELS}
								isLoading={isLoading}
							/>
							{hasMoreThanOnePage && (
								<Pagination
									currentPage={page}
									setPage={setPage}
									totalPages={data?.totalPages}
								/>
							)}
						</ListPage>
					</>
				}
			/>
			<TransactionDeleteModal
				modalId={MODALS_IDS.TRANSACTION_REMOVE_MODAL}
				selectedTransaction={selectedTransaction}
				setSelectedTransaction={setSelectedTransaction}
			/>
		</>
	)
}
