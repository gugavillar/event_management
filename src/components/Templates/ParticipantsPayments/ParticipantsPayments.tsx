'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { Select } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent, PaymentModal } from '@/components/Organisms'
import { PaymentModalType } from '@/components/Organisms/PaymentModal/PaymentModal.schema'
import {
	MODALS_IDS,
	overlayClose,
	overlayOpen,
	PaymentSelectOptions,
} from '@/constants'
import { formatterFieldSelectValues, removeCurrencyFormat } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import {
	useGetPayments,
	useUpdateParticipantPayment,
} from '@/services/queries/participants'
import { ParticipantsPaymentsFromAPI } from '@/services/queries/participants/participants.type'

import { formatTableData, HEADER_LABELS } from './ParticipantsPayments.utils'

export const ParticipantsPayments = () => {
	const [selectedParticipant, setSelectedParticipant] =
		useState<ParticipantsPaymentsFromAPI | null>(null)
	const { data: events } = useGetEvents()
	const {
		data: participants,
		isLoading: isLoadingParticipants,
		search,
		setSearch,
		setEventId,
		eventId,
		setPaymentType,
		paymentType,
	} = useGetPayments()
	const { update, isPending } = useUpdateParticipantPayment()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const handleOpenModalToPaymentParticipant = (
		payment: ParticipantsPaymentsFromAPI,
	) => {
		setSelectedParticipant(payment)
		overlayOpen(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
	}

	const formattedData = formatTableData(
		participants,
		handleOpenModalToPaymentParticipant,
	)

	const handleUpdate = async (values: PaymentModalType) => {
		if (!selectedParticipant) return

		const formatValues = {
			paymentType: values.paymentType,
			paymentValue:
				values.paid === 'partial' && values.paymentValue
					? Number(removeCurrencyFormat(values.paymentValue))
					: Number(
							removeCurrencyFormat(selectedParticipant.event.participantPrice),
						),
		}
		await update(
			{ paymentId: selectedParticipant.id, data: formatValues },
			{
				onSuccess: () => {
					setSelectedParticipant(null)
					toast.success('Pagamento do participante atualizado com sucesso!')
					overlayClose(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
				},
				onError: () =>
					toast.error('Erro ao atualizar pagamento do participante'),
			},
		)
	}

	return (
		<PageContent
			pageTitle="Lista de pagamentos participantes"
			subheadingPage="Listagem de pagamento dos participantes"
			isLoading={isLoadingParticipants}
		>
			<ListPage
				placeholderField="Encontrar um participante"
				className="lg:max-w-full"
				search={search}
				setSearch={setSearch}
				moreFilter={
					<>
						<Select
							placeholder="Selecione o evento"
							options={formattedEvents}
							value={eventId}
							onChange={(e) => setEventId(e.target.value)}
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
					// handleClickRow={handleClickRow}
					isLoading={isLoadingParticipants}
				/>
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
