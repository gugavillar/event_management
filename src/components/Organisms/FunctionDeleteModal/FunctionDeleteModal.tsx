import { OctagonAlert } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { overlayClose } from '@/constants'
import { useDeleteFunction } from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

type FunctionDeleteModalProps = {
	modalId: string
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
	selectedFunction: VolunteersFunctionsFromAPI | null
}

export const FunctionDeleteModal = memo(
	({
		modalId,
		selectedFunction,
		setSelectedFunction,
	}: FunctionDeleteModalProps) => {
		const { remove, isPending } = useDeleteFunction()

		const handleDeleteFunction = async () => {
			if (!selectedFunction) return
			await remove(selectedFunction.id, {
				onSuccess: () => {
					setSelectedFunction(null)
					toast.success('Função excluída com sucesso!')
					overlayClose(modalId)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao excluir a função'),
			})
		}

		return (
			<Modal modalId={modalId} handleClose={() => setSelectedFunction(null)}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								Você deseja excluir a função?
							</Header>
							<Text>
								Ao excluir a função todos os voluntários vinculados a ela
								ficarão sem função.
							</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
								onClick={() => setSelectedFunction(null)}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={handleDeleteFunction}
								isLoading={isPending}
								disabled={isPending}
							>
								Confirmar
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		)
	},
)

FunctionDeleteModal.displayName = 'FunctionDeleteModal'
