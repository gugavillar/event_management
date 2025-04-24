'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import { InputField } from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { useCreateFunction } from '@/services/queries/volunteers'

import {
	FunctionSchema,
	FunctionSchemaType,
} from './CreateVolunteerFunctionModal.schema'

type CreateVolunteerFunctionModalProps = {
	modalId: string
}

export const CreateVolunteerFunctionModal = ({
	modalId,
}: CreateVolunteerFunctionModalProps) => {
	const methods = useForm<FunctionSchemaType>({
		defaultValues: {
			role: '',
		},
		resolver: zodResolver(FunctionSchema),
	})
	const { create, isPending } = useCreateFunction()

	const handleSubmit: SubmitHandler<FunctionSchemaType> = async (values) => {
		await create(values, {
			onSuccess: () => {
				toast.success('Função cadastrada com sucesso!')
				methods.reset()
				overlayClose(modalId)
			},
			onError: () => toast.error('Erro ao cadastrar função'),
		})
	}

	return (
		<Modal modalId={modalId}>
			<FormProvider {...methods}>
				<div className="flex w-full flex-col items-center justify-center">
					<div className="flex w-full flex-col items-center justify-between gap-6">
						<Header as="h3" className="text-2xl">
							Cadastrar função
						</Header>
						<InputField fieldName="role">Função</InputField>
						<Button
							className="w-full max-w-40 items-center justify-center border-transparent bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
							type="submit"
							onClick={methods.handleSubmit(handleSubmit)}
							disabled={
								!methods.formState.isValid || !methods.formState.isDirty
							}
							isLoading={isPending}
						>
							Salvar
						</Button>
					</div>
				</div>
			</FormProvider>
		</Modal>
	)
}
