import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Select } from '@/components/Atoms'
import { PaymentSelectOptions } from '@/constants'

type PaymentModalProps = {
	modalId: string
}

export const PaymentModal = ({ modalId }: PaymentModalProps) => {
	return (
		<Modal modalId={modalId}>
			<div className="flex flex-col items-center justify-center px-4 pb-3">
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
					options={PaymentSelectOptions}
				/>
				<div className="flex w-full flex-col justify-end gap-y-4 md:flex-row md:gap-x-5">
					<Button
						type="button"
						className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200 md:w-32"
						data-hs-overlay={`#${modalId}`}
					>
						Cancelar
					</Button>
					<Button className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800 md:w-32">
						Confirmar
					</Button>
				</div>
			</div>
		</Modal>
	)
}
