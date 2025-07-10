'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { Pagination, Select } from '@/components/Atoms'
import { ComboBox, ListManager } from '@/components/Molecules'
import {
	ListPage,
	ModalReturnPayment,
	PageContent,
} from '@/components/Organisms'
import { ModalReturnPaymentType } from '@/components/Organisms/ModalReturnPayment/ModalReturnPayment.schema'
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
	useGetPayments,
	useGetVolunteersCities,
	useReturnVolunteerPayment,
	useUpdateVolunteerPayment,
} from '@/services/queries/volunteers'
import { VolunteersPaymentsAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

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
	const { data: volunteersCities } = useGetVolunteersCities()
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
		city,
		setCity,
	} = useGetPayments()
	const { update, isPending } = useUpdateVolunteerPayment()
	const { update: returnPayment, isPending: isPendingReturn } =
		useReturnVolunteerPayment()

	const formattedEvents = formatterComboBoxValues(
		events?.pages?.flatMap((page) => page.data),
		'name',
		'id',
		true,
		'Todos os eventos',
	)

	const formattedCities = formatterFieldSelectValues(
		volunteersCities,
		'city',
		'city',
	)
	formattedCities.unshift({ label: 'Todas as cidades', value: '' })

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

	const handleOpenModalToReturnPaymentVolunteer = useCallback(
		(payment: VolunteersPaymentsAPI) => {
			setSelectedVolunteer(payment)
			overlayOpen(MODALS_IDS.VOLUNTEER_RETURN_PAYMENT_MODAL)
		},
		[],
	)

	const formattedData = formatTableData(
		volunteersPayments?.data,
		handleOpenModalToPaymentVolunteer,
		handleOpenModalToReturnPaymentVolunteer,
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
					onError: (error) =>
						generateToastError(
							error,
							'Erro ao atualizar pagamento do voluntário',
						),
				},
			)
		},
		[selectedVolunteer, update],
	)

	const handleReturnPayment = useCallback(
		async (values: ModalReturnPaymentType) => {
			if (!selectedVolunteer) return

			const formatValues = {
				returnValue:
					values.returnPaid === 'partial' && values.returnValue
						? Number(removeCurrencyFormat(values.returnValue))
						: Number(
								removeCurrencyFormat(selectedVolunteer.event.volunteerPrice),
							),
			}

			await returnPayment(
				{ paymentId: selectedVolunteer.id, data: formatValues },
				{
					onSuccess: () => {
						setSelectedVolunteer(null)
						toast.success('Pagamento do voluntário devolvido com sucesso!')
					},
					onError: (error) =>
						generateToastError(
							error,
							'Erro ao atualizar pagamento do voluntário',
						),
				},
			)
		},
		[selectedVolunteer, returnPayment],
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
			<ModalReturnPayment
				modalId={MODALS_IDS.VOLUNTEER_RETURN_PAYMENT_MODAL}
				modalType="voluntário"
				handleSubmit={handleReturnPayment}
				isPending={isPendingReturn}
				payment={selectedVolunteer}
			/>
		</PageContent>
	)
}
