'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { Pagination } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	FilterDrawer,
	ListPage,
	ModalReturnPayment,
	PageContent,
} from '@/components/Organisms'
import type { PaymentModalType } from '@/components/Organisms/PaymentModal/PaymentModal.schema'
import {
	MEMBERS,
	MODALS_IDS,
	overlayClose,
	overlayOpen,
	PaymentTypeAPI,
} from '@/constants'
import { removeCurrencyFormat } from '@/formatters'
import {
	useCreateParticipantPayment,
	useGetPayments,
} from '@/services/queries/participants'
import { useReturnParticipantPayment } from '@/services/queries/participants/hooks/useReturnParticipantPayment'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { generateToastError } from '@/utils/errors'
import { formatTableData, HEADER_LABELS } from './ParticipantsPayments.utils'

const PaymentModal = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.PaymentModal)
)

const ParticipantModalData = dynamic(() =>
	import('@/components/Organisms').then((mod) => mod.ParticipantModalData)
)

export const ParticipantsPayments = () => {
	const [selectedParticipant, setSelectedParticipant] =
		useState<ParticipantsAPI | null>(null)
	const [selectParticipant, setSelectParticipant] = useState<
		ParticipantsAPI['id'] | null
	>(null)
	const {
		data: participantsPayments,
		isLoading: isLoadingPayments,
		search,
		setSearch,
		page,
		setPage,
		query,
		setQuery,
	} = useGetPayments()
	const { create, isPending } = useCreateParticipantPayment()
	const { returnPayment, isPending: isReturnPending } =
		useReturnParticipantPayment()

	const handleOpenModalToPaymentParticipant = useCallback(
		(payment: ParticipantsAPI) => {
			setSelectedParticipant(payment)
			overlayOpen(MODALS_IDS.PARTICIPANT_PAYMENT_MODAL)
		},
		[]
	)

	const handleOpenModalToReturnPaymentParticipant = useCallback(
		(payment: ParticipantsAPI) => {
			setSelectedParticipant(payment)
			overlayOpen(MODALS_IDS.PARTICIPANT_RETURN_PAYMENT_MODAL)
		},
		[]
	)

	const handleOpenModalToShowParticipantData = useCallback(
		(id: ParticipantsAPI['id']) => {
			setSelectParticipant(id)
			overlayOpen(MODALS_IDS.PARTICIPANT_MODAL_DATA)
		},
		[]
	)

	const formattedData = formatTableData(
		participantsPayments?.data,
		handleOpenModalToPaymentParticipant,
		handleOpenModalToReturnPaymentParticipant,
		handleOpenModalToShowParticipantData
	)

	const handleUpdate = useCallback(
		async (values: PaymentModalType) => {
			if (!selectedParticipant) return

			const formatValues = {
				eventId: selectedParticipant.eventId,
				participantId: selectedParticipant.id,
				paymentType: values.paymentType as PaymentTypeAPI,
				paymentValue:
					values.paid === 'partial' && values.paymentValue
						? Number(removeCurrencyFormat(values.paymentValue))
						: Number(
								removeCurrencyFormat(selectedParticipant.event.participantPrice)
							),
				...(values.paymentType === PaymentTypeAPI.CARD && {
					paymentReceived: Number(
						removeCurrencyFormat(values.paymentReceived as string)
					),
				}),
			}
			await create(
				{ data: formatValues },
				{
					onError: (error) =>
						generateToastError(
							error,
							'Erro ao registrar pagamento do participante'
						),
					onSuccess: () => {
						setSelectedParticipant(null)
						toast.success('Pagamento do participante registrado com sucesso!')
					},
				}
			)
		},
		[selectedParticipant, create]
	)

	const handleReturnPayment = useCallback(async () => {
		if (!selectedParticipant) return

		const results = await Promise.allSettled(
			selectedParticipant.payments.map((p) => returnPayment({ id: p.id }))
		)
		const hasError = results.some((res) => res.status === 'rejected')

		if (hasError) {
			toast.error('Erro ao devolver pagamento do participante')
		} else {
			toast.success('Pagamento do participante devolvido com sucesso!')
		}

		setSelectedParticipant(null)
		overlayClose(MODALS_IDS.PARTICIPANT_RETURN_PAYMENT_MODAL)
	}, [returnPayment, selectedParticipant])

	const hasMoreThanOnePage =
		!!participantsPayments?.totalPages && participantsPayments.totalPages > 1
	const isExistPayment = Boolean(selectedParticipant?.payments?.length)
	const paidValue =
		selectedParticipant?.payments?.reduce(
			(total, p) => (total += Number(p.paymentValue)),
			0
		) ?? 0
	const eventValue = Number(selectedParticipant?.event?.participantPrice) ?? 0

	return (
		<PageContent
			pageTitle="Pagamentos dos participantes"
			subheadingPage="Lista de pagamentos"
		>
			<ListPage
				className="lg:max-w-full"
				moreFilter={
					<FilterDrawer
						drawerId={MODALS_IDS.PARTICIPANT_FILTER_PAYMENT_DRAWER}
						isPaymentType
						query={query}
						setQuery={setQuery}
						type={MEMBERS.PARTICIPANT}
					/>
				}
				placeholderField="Encontrar um participante"
				search={search}
				setSearch={setSearch}
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
						totalPages={participantsPayments?.totalPages}
					/>
				)}
			</ListPage>
			<PaymentModal
				eventValue={eventValue}
				handleSubmit={handleUpdate}
				isExistPayment={isExistPayment}
				isPending={isPending}
				modalId={MODALS_IDS.PARTICIPANT_PAYMENT_MODAL}
				modalType="participante"
				paidValue={paidValue}
			/>
			<ModalReturnPayment
				handleReturnPayment={handleReturnPayment}
				isPending={isReturnPending}
				modalId={MODALS_IDS.PARTICIPANT_RETURN_PAYMENT_MODAL}
				modalType="participante"
			/>
			<ParticipantModalData
				modalId={MODALS_IDS.PARTICIPANT_MODAL_DATA}
				selectedParticipant={selectParticipant}
				setSelectedParticipant={setSelectParticipant}
			/>
		</PageContent>
	)
}
