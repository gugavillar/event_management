'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { Pagination, Select } from '@/components/Atoms'
import { ComboBox, ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { PaymentModalType } from '@/components/Organisms/PaymentModal/PaymentModal.schema'
import {
	MODALS_IDS,
	overlayOpen,
	PaymentSelectOptions,
	PaymentTypeAPI,
} from '@/constants'
import { formatterComboBoxValues, removeCurrencyFormat } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useGetPayments,
	useUpdateVolunteerPayment,
} from '@/services/queries/volunteers'
import { VolunteersPaymentsAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './VolunteersPayments.utils'

const PaymentModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.PaymentModal),
)

export const VolunteersPayments = () => {
	const [selectedVolunteer, setSelectedVolunteer] =
		useState<VolunteersPaymentsAPI | null>(null)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		data: volunteersPayments,
		isLoading: isLoadingPayments,
		search,
		setSearch,
		setEventId,
		eventId,
		setPaymentType,
		paymentType,
		page,
		setPage,
	} = useGetPayments()
	const { update, isPending } = useUpdateVolunteerPayment()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleOpenModalToPaymentVolunteer = useCallback(
		(payment: VolunteersPaymentsAPI) => {
			setSelectedVolunteer(payment)
			overlayOpen(MODALS_IDS.VOLUNTEER_PAYMENT_MODAL)
		},
		[],
	)

	const formattedData = formatTableData(
		volunteersPayments?.data,
		handleOpenModalToPaymentVolunteer,
	)

	const handleUpdate = useCallback(
		async (values: PaymentModalType) => {
			if (!selectedVolunteer) return

			const formatValues = {
				paymentType: values.paymentType as PaymentTypeAPI,
				paymentValue:
					values.paid === 'partial' && values.paymentValue
						? Number(removeCurrencyFormat(values.paymentValue))
						: Number(
								removeCurrencyFormat(selectedVolunteer.event.volunteerPrice),
							),
			}

			await update(
				{ paymentId: selectedVolunteer.id, data: formatValues },
				{
					onSuccess: () => {
						setSelectedVolunteer(null)
						toast.success('Pagamento do voluntário atualizado com sucesso!')
					},
					onError: () =>
						toast.error('Erro ao atualizar pagamento do voluntário'),
				},
			)
		},
		[selectedVolunteer, update],
	)

	const hasMoreThanOnePage =
		!!volunteersPayments?.totalPages && volunteersPayments.totalPages > 1

	return (
		<PageContent
			pageTitle="Pagamentos dos voluntários"
			subheadingPage="Lista de pagamentos"
		>
			<ListPage
				placeholderField="Encontrar um voluntário"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<ComboBox
							keyOptionLabel="label"
							keyOptionValue="value"
							options={formattedEvents}
							selectedValue={eventId}
							setSelectedValue={setEventId}
							lastItemRef={lastItemRef}
						/>
						<Select
							placeholder="Selecione o tipo de pagamento"
							options={PaymentSelectOptions}
							value={paymentType}
							onChange={(e) => setPaymentType(e.target.value)}
						/>
					</>
				}
			>
				<ListManager
					bodyData={formattedData}
					headerLabels={HEADER_LABELS}
					isLoading={isLoadingPayments}
				/>
				{hasMoreThanOnePage && (
					<Pagination
						currentPage={page}
						setPage={setPage}
						totalPages={volunteersPayments?.totalPages}
					/>
				)}
			</ListPage>
			<PaymentModal
				modalId={MODALS_IDS.VOLUNTEER_PAYMENT_MODAL}
				modalType="voluntário"
				handleSubmit={handleUpdate}
				isPending={isPending}
			/>
		</PageContent>
	)
}
