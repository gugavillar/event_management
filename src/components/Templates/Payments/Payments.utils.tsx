import { Spinner } from '@/components/Atoms'

export const PaymentCardInfo = ({
	isFetching,
	payments,
	selectedEvent,
}: {
	selectedEvent: string
	isFetching: boolean
	payments: Array<any>
}) => {
	if (!selectedEvent) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">Selecione um evento</h3>
				<p className="mt-2 text-gray-500">
					Os registros são exibidos conforme o evento selecionado. Escolha um
					para continuar.
				</p>
			</div>
		)
	}

	if (!isFetching && !payments?.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center md:p-5">
				<h3 className="text-lg font-bold text-gray-800">
					Nenhum registro encontrado
				</h3>
				<p className="mt-2 text-gray-500">
					Nenhum registro foi criado para o evento selecionado.
				</p>
			</div>
		)
	}

	if (isFetching) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5">
				<Spinner />
			</div>
		)
	}
}
