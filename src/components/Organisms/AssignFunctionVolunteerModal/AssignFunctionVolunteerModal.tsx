'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import { SelectField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import {
	useGetVolunteersFunctions,
	useUpdateVolunteerFunction,
} from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

import {
	AssignFunctionSchema,
	AssignFunctionType,
} from './AssignFunctionVolunteerModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedVolunteer: VolunteersAPI['id'] | null
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const AssignFunctionVolunteerModal = ({
	modalId,
	selectedVolunteer,
	setSelectedVolunteer,
}: CreateVolunteerFunctionModalProps) => {
	const { data } = useGetVolunteersFunctions()
	const { isPending, update } = useUpdateVolunteerFunction()
	const methods = useForm<AssignFunctionType>({
		defaultValues: {
			roleId: '',
		},
		resolver: zodResolver(AssignFunctionSchema),
	})

	const handleSubmit: SubmitHandler<AssignFunctionType> = async (values) => {
		if (!selectedVolunteer) return

		await update(
			{ volunteerId: selectedVolunteer, ...values },
			{
				onSuccess: () => {
					setSelectedVolunteer(null)
					toast.success('Função atribuída com sucesso!')
					overlayClose(modalId)
				},
				onError: () => toast.error('Erro ao atribuir a função'),
			},
		)
	}

	const formattedFunctions = formatterFieldSelectValues(data, 'role', 'id')

	return (
		<Modal modalId={modalId} handleClose={() => setSelectedVolunteer(null)}>
			<FormProvider {...methods}>
				<div className="flex w-full flex-col items-center justify-center">
					<div className="flex w-full flex-col items-center justify-between gap-6">
						<Header as="h3" className="text-2xl">
							Atribuir função ao voluntário
						</Header>
						<SelectField
							fieldName="roleId"
							placeholder="Selecione a função"
							options={formattedFunctions}
						>
							Função
						</SelectField>
						<Button
							className="w-full max-w-40 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							type="submit"
							onClick={methods.handleSubmit(handleSubmit)}
							disabled={!methods.formState.isValid}
							isLoading={isPending}
						>
							Atribuir
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
