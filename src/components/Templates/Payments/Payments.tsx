'use client'
import { useEffect, useState } from 'react'
import { IoMdAlert } from 'react-icons/io'

import {
	Button,
	Header,
	Modal,
	Select,
	Spinner,
	TableProps,
} from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import { ListPage, PageContent } from '@/components/Organisms'
import { PaymentType, PaymentTypeAPI } from '@/constants'

import { FAKE_PARTICIPANTES } from './Payments.mocks'

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
	{
		label: 'Status',
		accessor: 'payment',
	},
]

export const Payments = () => {
	const [tableData, setTableData] = useState<null | ReturnType<
		typeof FAKE_PARTICIPANTES
	>>()

	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(document.getElementById('test-modal') as HTMLElement)
	}

	useEffect(() => {
		if (tableData) return

		setTableData(FAKE_PARTICIPANTES())
	}, [tableData])

	return (
		<>
			<PageContent subheadingPage="Listagem de colaboradores do evento">
				{!tableData ? (
					<Spinner />
				) : (
					<ListPage placeholderField="Encontrar um colaborador">
						<ListManager
							bodyData={tableData}
							headerLabels={HEADER_LABELS}
							handleClickRow={handleClickRow}
						/>
					</ListPage>
				)}
			</PageContent>
			<Modal modalId="test-modal">
				<div className="flex flex-col items-center justify-center px-6 pb-6">
					<div className="flex flex-col items-center justify-between gap-2 md:flex-row">
						<IoMdAlert size={32} className="text-amber-300" />
						<Header as="h3" className="text-center text-lg">
							Você deseja confirmar o pagamento do colaborador?
						</Header>
					</div>
					<Select
						className="mx-auto my-6 max-w-sm"
						defaultValue=""
						placeholder="Selecione a forma de pagamento"
						options={[
							{
								label: PaymentType[PaymentTypeAPI.CARD].label,
								value: PaymentTypeAPI.CARD,
							},
							{
								label: PaymentType[PaymentTypeAPI.CASH].label,
								value: PaymentTypeAPI.CASH,
							},
							{
								label: PaymentType[PaymentTypeAPI.PIX].label,
								value: PaymentTypeAPI.PIX,
							},
						]}
					/>
					<div className="flex w-full flex-col justify-end gap-y-4 md:flex-row md:gap-x-5">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200 md:w-32"
							data-hs-overlay="#test-modal"
						>
							Cancelar
						</Button>
						<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:w-32">
							Confirmar
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}
