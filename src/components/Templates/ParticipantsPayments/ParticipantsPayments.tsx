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
import {
	formatterComboBoxValues,
	formatterFieldSelectValues,
	removeCurrencyFormat,
} from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useCreateParticipantPayment,
	useGetParticipantsCities,
	useGetPayments,
} from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { generateToastError } from '@/utils/errors'

import { formatTableData, HEADER_LABELS } from './ParticipantsPayments.utils'

const PaymentModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.PaymentModal),
)

export const ParticipantsPayments = () => {
	const [selectedParticipant, setSelectedParticipant] =
		useState<ParticipantsAPI | null>(null)
	const {
		data: events,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetInfinityEvents()
	const { data: participantsCities } = useGetParticipantsCities()
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
		city,
		setCity,
	} = useGetPayments()
	const { create, isPending } = useCreateParticipantPayment()
	// const { update: returnPayment, isPending: isReturnPending } =
	// 	useReturnParticipantPayment()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)

	const formattedCities = formatterFieldSelectValues(
		participantsCities,
		'city',
		'city',
	)
	formattedCities.unshift({ label: 'Todas as cidades', value: '' })

	const lastItemRef = useInfiniteScrollObserver({
		hasNextPage: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	})

	const handleOpenModalToPaymentParticipant = useCallback(
		(payment: ParticipantsAPI) => {
			setSelectedParticipant(payment)
			overlayOpen(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
		},
		[],
	)

	const handleOpenModalToReturnPaymentParticipant = useCallback(
		(payment: ParticipantsAPI) => {
			setSelectedParticipant(payment)
			overlayOpen(MODALS_IDS.PARTICIPANT_RETURN_PAYMENT_MODAL)
		},
		[],
	)

	const formattedData = formatTableData(
		participantsPayments?.data,
		handleOpenModalToPaymentParticipant,
		handleOpenModalToReturnPaymentParticipant,
	)

	const handleUpdate = useCallback(
		async (values: PaymentModalType) => {
			if (!selectedParticipant) return

			const formatValues = {
				paymentType: values.paymentType as PaymentTypeAPI,
				eventId: selectedParticipant.eventId,
				participantId: selectedParticipant.id,
				paymentValue:
					values.paid === 'partial' && values.paymentValue
						? Number(removeCurrencyFormat(values.paymentValue))
						: Number(
								removeCurrencyFormat(
									selectedParticipant.event.participantPrice,
								),
							),
			}
			await create(
				{ data: formatValues },
				{
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Pagamento do participante registrado com sucesso!')
					},
					onError: (error) =>
						generateToastError(
							error,
							'Erro ao registrar pagamento do participante',
						),
				},
			)
		},
		[selectedParticipant, create],
	)

	// const handleReturnPayment = useCallback(
	// 	async (values: ModalReturnPaymentType) => {
	// 		if (!selectedParticipant) return

	// 		const formatValues = {
	// 			returnValue:
	// 				values.returnPaid === 'partial' && values.returnValue
	// 					? Number(removeCurrencyFormat(values.returnValue))
	// 					: Number(
	// 							removeCurrencyFormat(
	// 								selectedParticipant.event.participantPrice,
	// 							),
	// 						),
	// 		}

	// 		await returnPayment(
	// 			{ paymentId: selectedParticipant.id, data: formatValues },
	// 			{
	// 				onSuccess: () => {
	// 					setSelectedParticipant(null)
	// 					toast.success('Pagamento do participante devolvido com sucesso!')
	// 				},
	// 				onError: (error) =>
	// 					generateToastError(
	// 						error,
	// 						'Erro ao atualizar pagamento do participante',
	// 					),
	// 			},
	// 		)
	// 	},
	// 	[selectedParticipant, returnPayment],
	// )

	const hasMoreThanOnePage =
		!!participantsPayments?.totalPages && participantsPayments.totalPages > 1
	const isExistPayment = Boolean(selectedParticipant?.payments?.length)

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
					<ComboBox
						keyOptionLabel="label"
						keyOptionValue="value"
						options={formattedEvents}
						selectedValue={eventId}
						setSelectedValue={setEventId}
						lastItemRef={lastItemRef}
					/>
				}
			>
				<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
					<Select
						placeholder="Selecione o tipo de pagamento"
						options={PaymentSelectOptions}
						value={paymentType}
						onChange={(e) => setPaymentType(e.target.value)}
					/>
					<Select
						options={formattedCities}
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
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
				isExistPayment={isExistPayment}
			/>
			{/* <ModalReturnPayment
				modalId={MODALS_IDS.PARTICIPANT_RETURN_PAYMENT_MODAL}
				modalType="participante"
				payment={selectedParticipant}
				isPending={isReturnPending}
				handleSubmit={handleReturnPayment}
			/> */}
		</PageContent>
	)
}
