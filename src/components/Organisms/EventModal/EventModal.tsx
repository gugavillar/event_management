import { IoMdAlert } from 'react-icons/io'

import { Button, Header, Modal, Text } from '@/components/Atoms'

type EventModalProps = {
	modalId: string
	handleConfirm: () => void
	isLoading: boolean
}

export const EventModal = ({
	modalId,
	handleConfirm,
	isLoading,
}: EventModalProps) => {
	return (
		<Modal modalId={modalId}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-between gap-6">
					<IoMdAlert size={64} className="text-amber-300" />
					<div className="space-y-4 text-center">
						<Header as="h3" className="text-2xl">
							Você deseja excluir o evento?
						</Header>
						<Text>
							Ao excluir o evento todos os dados que vinculados a ele serão
							excluídos.
						</Text>
					</div>
					<div className="flex w-full items-center justify-between gap-x-8">
						<Button
							type="button"
							className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
							data-hs-overlay={`#${modalId}`}
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							onClick={handleConfirm}
							isLoading={isLoading}
							disabled={isLoading}
						>
							Confirmar
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
