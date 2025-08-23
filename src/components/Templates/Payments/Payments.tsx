'use client'
import { useState } from 'react'

import { ComboBox, PaymentCard } from '@/components/Molecules'
import { CreateTransaction } from '@/components/Organisms'
import { formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'

export const Payment = () => {
	const [selectedValue, setSelectedValue] = useState<string>('')
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()

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
	return (
		<>
			<ComboBox
				className="max-w-[25.875rem]"
				keyOptionLabel="label"
				keyOptionValue="value"
				options={formattedEvents}
				selectedValue={selectedValue}
				setSelectedValue={setSelectedValue}
				lastItemRef={lastItemRef}
				label="Evento"
			/>
			<section className="grid grid-cols-1 gap-8 md:grid-cols-3">
				<PaymentCard
					headerText="Entradas"
					value={0}
					headerClassName="bg-green-100"
				/>
				<PaymentCard
					headerText="Saídas"
					value={0}
					headerClassName="bg-red-100"
				/>
				<PaymentCard headerText="Saldo" value={0} />
			</section>
			<CreateTransaction />
		</>
	)
}
