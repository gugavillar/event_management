'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, memo, SetStateAction, useEffect } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import { InputField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import {
	useCreateFunction,
	useUpdateFunction,
} from '@/services/queries/volunteers'
import { VolunteersFunctionsFromAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'

import {
	FunctionSchema,
	FunctionSchemaType,
} from './CreateVolunteerFunctionModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
	selectedFunction: VolunteersFunctionsFromAPI | null
	setSelectedFunction: Dispatch<
		SetStateAction<VolunteersFunctionsFromAPI | null>
	>
}

export const CreateVolunteerFunctionModal = memo(
	({
		modalId,
		selectedFunction,
		setSelectedFunction,
	}: CreateVolunteerFunctionModalProps) => {
		const methods = useForm<FunctionSchemaType>({
			defaultValues: {
				role: '',
			},
			resolver: zodResolver(FunctionSchema),
		})
		const { create, isPending: isPendingCreate } = useCreateFunction()
		const { update, isPending: isPendingUpdate } = useUpdateFunction()

		const handleSubmit: SubmitHandler<FunctionSchemaType> = async (values) => {
			if (selectedFunction) {
				return await update(
					{ id: selectedFunction.id, ...values },
					{
						onSuccess: () => {
							toast.success('Função atualizada com sucesso!')
							methods.reset()
							setSelectedFunction(null)
							overlayClose(modalId)
						},
						onError: (error) =>
							generateToastError(error, 'Erro ao atualizar a função'),
					},
				)
			}
			await create(values, {
				onSuccess: () => {
					toast.success('Função cadastrada com sucesso!')
					methods.reset()
					overlayClose(modalId)
				},
				onError: (error) =>
					generateToastError(error, 'Erro ao cadastrar a função'),
			})
		}

		useEffect(() => {
			if (!selectedFunction) return methods.reset()
			methods.reset(
				{
					role: selectedFunction.role,
				},
				{ keepDefaultValues: true },
			)
		}, [methods, selectedFunction])

		return (
			<Modal modalId={modalId} handleClose={() => setSelectedFunction(null)}>
				<FormProvider {...methods}>
					<div className="flex w-full flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-between gap-6">
							<Header as="h3" className="text-2xl">
								{selectedFunction ? 'Editar' : 'Criar'} função
							</Header>
							<InputField fieldName="role">Função</InputField>
							<Button
								className="w-full max-w-40 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
								type="submit"
								onClick={methods.handleSubmit(handleSubmit)}
								disabled={
									!methods.formState.isValid || !methods.formState.isDirty
								}
								isLoading={isPendingCreate || isPendingUpdate}
							>
								Salvar
							</Button>
						</div>
					</div>
				</FormProvider>
			</Modal>
		)
	},
)

CreateVolunteerFunctionModal.displayName = 'CreateVolunteerFunctionModal'
