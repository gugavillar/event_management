'use client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { overlayClose, UF } from '@/constants'
import { formatDateToSendToApi } from '@/formatters'
import {
	useGetVolunteer,
	useUpdateVolunteer,
} from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

import { VolunteerType } from './VolunteerDrawer.schema'

type VolunteerDrawerProps = {
	drawerId: string
	selectedVolunteer: null | VolunteersAPI['id']
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const VolunteerDrawer = ({
	drawerId,
	selectedVolunteer,
	setSelectedVolunteer,
}: VolunteerDrawerProps) => {
	const { data, isLoading } = useGetVolunteer(selectedVolunteer)
	const { isPending, update } = useUpdateVolunteer()
	const {
		handleSubmit,
		reset,
		formState: { isValid, isDirty },
	} = useFormContext<VolunteerType>()

	const handleSubmitForm: SubmitHandler<VolunteerType> = async (values) => {
		if (!selectedVolunteer) return

		await update(
			{
				volunteerId: selectedVolunteer,
				data: {
					...values,
					birthdate: formatDateToSendToApi(values.birthdate),
					contact: values.contact.replace(/\D/g, ''),
				},
			},
			{
				onSuccess: () => {
					reset()
					setSelectedVolunteer(null)
					toast.success('Voluntário atualizado com sucesso!')
					overlayClose(drawerId)
				},
				onError: () => toast.error('Erro ao atualizar voluntário'),
			},
		)
	}

	useEffect(() => {
		if (!data) return

		reset({ ...data }, { keepDefaultValues: true })
	}, [data, reset])

	return (
		<Drawer
			drawerId={drawerId}
			headingTitle="Dados do voluntário"
			handleClose={() => setSelectedVolunteer(null)}
		>
			<DrawerBody isLoading={isLoading}>
				<InputField fieldName="name">Nome completo</InputField>
				<InputField fieldName="email">E-mail</InputField>
				<InputField fieldName="called">
					Como você gostaria de ser chamado(a)?
				</InputField>
				<MaskedInputField format="##/##/####" fieldName="birthdate">
					Data de nascimento (DD/MM/AAAA)
				</MaskedInputField>
				<MaskedInputField format="(##) #####-####" fieldName="contact">
					Telefone para contato
				</MaskedInputField>
				<InputField fieldName="maritalStatus">Estado civil</InputField>
				<InputField fieldName="street">Endereço</InputField>
				<InputField fieldName="neighborhood">Bairro</InputField>
				<InputField fieldName="number">Número</InputField>
				<InputField fieldName="city">Cidade</InputField>
				<SelectField
					fieldName="state"
					placeholder="Selecione o estado"
					options={UF}
				>
					Estado
				</SelectField>
				<InputField fieldName="parent">Nome do parente próximo</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contactParent">
					Telefone do responsável ou parente
				</MaskedInputField>
				<InputField fieldName="relationship">
					Parentesco (ex: mãe, tio, avó...)
				</InputField>
			</DrawerBody>
			<DrawerFooter>
				<Button
					className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
					onClick={handleSubmit(handleSubmitForm)}
					type="submit"
					isLoading={isPending}
					disabled={!isValid || !isDirty}
				>
					Salvar
				</Button>
			</DrawerFooter>
		</Drawer>
	)
}
