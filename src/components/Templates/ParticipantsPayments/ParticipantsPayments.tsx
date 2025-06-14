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
	useUpdateParticipantPayment,
} from '@/services/queries/participants'
import { ParticipantsPaymentsAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './ParticipantsPayments.utils'

const PaymentModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.PaymentModal),
)

export const ParticipantsPayments = () => {
	const [selectedParticipant, setSelectedParticipant] =
		useState<ParticipantsPaymentsAPI | null>(null)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const {
		data: participantsPayments,
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
	const { update, isPending } = useUpdateParticipantPayment()

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

	const handleOpenModalToPaymentParticipant = useCallback(
		(payment: ParticipantsPaymentsAPI) => {
			setSelectedParticipant(payment)
			overlayOpen(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
		},
		[],
	)

	const formattedData = formatTableData(
		participantsPayments?.data,
		handleOpenModalToPaymentParticipant,
	)

	const handleUpdate = useCallback(
		async (values: PaymentModalType) => {
			if (!selectedParticipant) return

			const formatValues = {
				paymentType: values.paymentType as PaymentTypeAPI,
				paymentValue:
					values.paid === 'partial' && values.paymentValue
						? Number(removeCurrencyFormat(values.paymentValue))
						: Number(
								removeCurrencyFormat(
									selectedParticipant.event.participantPrice,
								),
							),
			}
			await update(
				{ paymentId: selectedParticipant.id, data: formatValues },
				{
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Pagamento do participante atualizado com sucesso!')
					},
					onError: () =>
						toast.error('Erro ao atualizar pagamento do participante'),
				},
			)
		},
		[selectedParticipant, update],
	)

	const hasMoreThanOnePage =
		!!participantsPayments?.totalPages && participantsPayments.totalPages > 1

	return (
		<PageContent
			pageTitle="Pagamentos dos participantes"
			subheadingPage="Lista de pagamentos"
		>
			<ListPage
				placeholderField="Encontrar um participante"
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
						totalPages={participantsPayments?.totalPages}
						setPage={setPage}
					/>
				)}
			</ListPage>
			<PaymentModal
				modalId={MODALS_IDS.PARTICIPANT_PAYMENT_MODAL}
				modalType="participante"
				handleSubmit={handleUpdate}
				isPending={isPending}
			/>
		</PageContent>
	)
}
