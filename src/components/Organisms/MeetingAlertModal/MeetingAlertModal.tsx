'use client'
import { OctagonAlert } from 'lucide-react'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal, Text } from '@/components/Atoms'
import { MeetingSchemaType } from '@/components/Templates/Meetings/Meetings.schema'
import { useCreateMeetingPresence } from '@/services/queries/meetings'

type MeetingAlertModalProps = {
	modalId: string
	type: 'draft' | 'send'
	meetingId: string
	clearState: VoidFunction
	isUpdate: boolean
}

export const MeetingAlertModal = memo(
	({
		modalId,
		type,
		meetingId,
		clearState,
		isUpdate,
	}: MeetingAlertModalProps) => {
		const { reset, getValues, handleSubmit } =
			useFormContext<MeetingSchemaType>()
		const { create, isPending } = useCreateMeetingPresence()

		const onSubmit = async (values: MeetingSchemaType) => {
			if (!values) return

			const formattedValues = {
				...values,
				meetingId,
			}

			await create(
				{ data: formattedValues, ...(isUpdate && { updatePresence: true }) },
				{
					onSuccess: () => {
						clearState()
						reset()
						localStorage.removeItem(meetingId)
						toast.success('Presença registrada com sucesso!')
					},
					onError: () => toast.error('Erro ao registrar presença'),
				},
			)
		}

		const handleSaveList = () => {
			const values = {
				meetingId,
				...getValues(),
			}

			localStorage.setItem(meetingId, JSON.stringify(values))
			toast.success('Presença salva com sucesso!')
			clearState()
		}

		const title =
			type === 'draft'
				? 'Salvar presenças temporariamente?'
				: 'Confirmar envio das presenças?'
		const description =
			type === 'draft'
				? 'As presenças serão armazenadas no seu dispositivo e poderão ser enviadas mais tarde.'
				: 'As presenças serão registradas permanentemente no sistema e não poderão ser editadas depois.'
		return (
			<Modal modalId={modalId}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-between gap-6">
						<OctagonAlert size={64} className="text-amber-300" />
						<div className="space-y-4 text-center">
							<Header as="h3" className="text-2xl">
								{title}
							</Header>
							<Text>{description}</Text>
						</div>
						<div className="flex w-full items-center justify-between gap-x-8">
							<Button
								type="button"
								className="w-full items-center justify-center transition-colors duration-500 hover:bg-gray-200"
								data-hs-overlay={`#${modalId}`}
								disabled={isPending}
							>
								Cancelar
							</Button>
							<Button
								className="w-full items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								onClick={
									type === 'draft' ? handleSaveList : handleSubmit(onSubmit)
								}
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

MeetingAlertModal.displayName = 'MeetingAlertModal'
