'use client'

import { Pagination } from '@/components/Atoms'
import { ComboBox, ListManager, TransactionCard } from '@/components/Molecules'
import { CreateTransaction, ListPage } from '@/components/Organisms'
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
		console.log(id)
	}

	const formatData = formatTableData(data?.data, handleRemoveTransaction)

	const hasMoreThanOnePage = !!data?.totalPages && data.totalPages > 1

	const balanceAmount =
		(data?.sumOfAllIncome ?? 0) - (data?.sumOfAllOutcome ?? 0)

	return (
		<>
			<ComboBox
				className="max-w-[25.875rem]"
				keyOptionLabel="label"
				keyOptionValue="value"
				options={formattedEvents}
				selectedValue={eventId}
				setSelectedValue={setEventId}
				lastItemRef={lastItemRef}
				label="Evento"
			/>
			{!eventId ? (
				<TransactionCardInfo
					isFetching={isLoading}
					payments={formatData}
					selectedEvent={eventId}
				/>
			) : (
				<>
					<section className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<TransactionCard
							headerText="Entradas"
							value={data?.sumOfAllIncome ?? 0}
							headerClassName="bg-green-100"
						/>
						<TransactionCard
							headerText="Saídas"
							value={data?.sumOfAllOutcome ?? 0}
							headerClassName="bg-red-100"
						/>
						<TransactionCard headerText="Saldo" value={balanceAmount} />
					</section>
					<CreateTransaction />
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
			)}
		</>
	)
}
