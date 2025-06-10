'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Trash2 } from 'lucide-react'
import { Dispatch, memo, SetStateAction } from 'react'
import {
	FormProvider,
	type SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Header, Modal } from '@/components/Atoms'
import {
	CheckboxField,
	FieldArrayContainerWithAppendButton,
	SelectField,
} from '@/components/Molecules'
import { overlayClose } from '@/constants'
import { formatterFieldSelectValues } from '@/formatters'
import {
	useGetFunctions,
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

export const AssignFunctionVolunteerModal = memo(
	({
		modalId,
		selectedVolunteer,
		setSelectedVolunteer,
	}: CreateVolunteerFunctionModalProps) => {
		const { data } = useGetFunctions()
		const { isPending, update } = useUpdateVolunteerFunction()
		const methods = useForm<AssignFunctionType>({
			mode: 'onChange',
			defaultValues: {
				roles: [{ roleId: '', isLeader: false }],
			},
			resolver: zodResolver(AssignFunctionSchema),
		})
		const { fields, append, remove } = useFieldArray({
			control: methods.control,
			name: 'roles',
		})

		const handleSubmit: SubmitHandler<AssignFunctionType> = async (values) => {
			if (!selectedVolunteer) return

			await update(
				{ volunteerId: selectedVolunteer, ...values },
				{
					onSuccess: () => {
						methods.reset()
						setSelectedVolunteer(null)
						toast.success('Funções atribuídas com sucesso!')
						overlayClose(modalId)
					},
					onError: () => toast.error('Erro ao atribuir funções'),
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
								Atribuir funções ao voluntário
							</Header>
							<FieldArrayContainerWithAppendButton
								className="w-full"
								label="Função"
								leftIcon={<CirclePlus />}
								handleAppendField={() =>
									append({ roleId: '', isLeader: false })
								}
							>
								{fields.map((field, index) => {
									const fieldName = `roles.${index}.roleId`
									const checkFieldName = `roles.${index}.isLeader`
									const hasMoreThanOneFunction = fields.length > 1
									return (
										<div key={field.id} className="w-full">
											<div className="flex flex-col gap-4">
												<SelectField
													fieldName={fieldName}
													placeholder="Selecione a função"
													options={formattedFunctions}
												>
													<div className="flex items-center justify-between">
														Função
														{hasMoreThanOneFunction ? (
															<Button
																className="mb-1 rounded-full border-none p-1 text-red-500 transition-colors duration-500 hover:bg-red-100 hover:text-red-800"
																onClick={() => remove(index)}
																leftIcon={<Trash2 size={18} />}
															/>
														) : null}
													</div>
												</SelectField>
												<CheckboxField
													label="Voluntário é o líder da função"
													fieldName={checkFieldName}
												/>
											</div>
										</div>
									)
								})}
							</FieldArrayContainerWithAppendButton>
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
	},
)

AssignFunctionVolunteerModal.displayName = 'AssignFunctionVolunteerModal'
