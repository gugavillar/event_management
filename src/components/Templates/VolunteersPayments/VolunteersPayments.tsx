'use client'

import { useState } from 'react'

import { Select } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent, PaymentModal } from '@/components/Organisms'
import { PaymentModalType } from '@/components/Organisms/PaymentModal/PaymentModal.schema'
import { MODALS_IDS, overlayOpen, PaymentSelectOptions } from '@/constants'
import { formatterFieldSelectValues, removeCurrencyFormat } from '@/formatters'
import { useGetEvents } from '@/services/queries/events'
import { useGetPayments } from '@/services/queries/volunteers'
import { VolunteersPaymentsFromAPI } from '@/services/queries/volunteers/volunteers.type'

import { formatTableData, HEADER_LABELS } from './VolunteersPayments.utils'

export const VolunteersPayments = () => {
	const [selectedVolunteer, setSelectedVolunteer] =
		useState<VolunteersPaymentsFromAPI | null>(null)
	const { data: events } = useGetEvents()
	const {
		data: volunteers,
		isLoading: isLoadingParticipants,
		search,
		setSearch,
		setEventId,
		eventId,
		setPaymentType,
		paymentType,
	} = useGetPayments()
	// const { update, isPending } = useUpdateParticipantPayment()

	const formattedEvents = formatterFieldSelectValues(events, 'name', 'id')

	const handleOpenModalToPaymentVolunteer = (
		payment: VolunteersPaymentsFromAPI,
	) => {
		setSelectedVolunteer(payment)
		overlayOpen(MODALS_IDS.VOLUNTEER_PAYMENT_MODAL)
	}

	const formattedData = formatTableData(
		volunteers,
		handleOpenModalToPaymentVolunteer,
	)

	const handleUpdate = async (values: PaymentModalType) => {
		if (!selectedVolunteer) return

		const formatValues = {
			paymentType: values.paymentType,
			paymentValue:
				values.paid === 'partial' && values.paymentValue
					? Number(removeCurrencyFormat(values.paymentValue))
					: Number(
							removeCurrencyFormat(selectedVolunteer.event.participantPrice),
						),
		}
		console.log(formatValues)
		// await update(
		// 	{ paymentId: selectedVolunteer.id, data: formatValues },
		// 	{
		// 		onSuccess: () => {
		// 			setSelectedVolunteer(null)
		// 			toast.success('Pagamento do participante atualizado com sucesso!')
		// 			overlayClose(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
		// 		},
		// 		onError: () =>
		// 			toast.error('Erro ao atualizar pagamento do participante'),
		// 	},
		// )
	}

	return (
		<PageContent
			pageTitle="Lista de pagamentos voluntários"
			subheadingPage="Listagem de pagamento dos voluntários"
			isLoading={isLoadingParticipants}
		>
			<ListPage
				placeholderField="Encontrar um voluntário"
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
					isLoading={isLoadingParticipants}
				/>
			</ListPage>
			<PaymentModal
				modalId={MODALS_IDS.VOLUNTEER_PAYMENT_MODAL}
				modalType="voluntário"
				handleSubmit={handleUpdate}
				isPending={false}
			/>
		</PageContent>
	)
}
