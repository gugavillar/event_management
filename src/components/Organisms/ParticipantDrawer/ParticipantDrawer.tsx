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
	useGetParticipant,
	useUpdateParticipant,
} from '@/services/queries/participants'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

import { ParticipantType } from './ParticipantDrawer.schema'

type ParticipantDrawerProps = {
	drawerId: string
	selectedParticipant: null | ParticipantsFromAPI['id']
	setSelectedParticipant: Dispatch<
		SetStateAction<ParticipantsFromAPI['id'] | null>
	>
}

export const ParticipantDrawer = ({
	drawerId,
	selectedParticipant,
	setSelectedParticipant,
}: ParticipantDrawerProps) => {
	const { data, isLoading } = useGetParticipant(selectedParticipant)
	const {
		handleSubmit,
		reset,
		formState: { isValid, isDirty },
	} = useFormContext<ParticipantType>()
	const { isPending, update } = useUpdateParticipant()

	const handleSubmitForm: SubmitHandler<ParticipantType> = async (values) => {
		if (!selectedParticipant) return

		await update(
			{
				participantId: selectedParticipant,
				data: {
					...values,
					birthdate: formatDateToSendToApi(values.birthdate),
					contact: values.contact.replace(/\D/g, ''),
					contactHost: values.contactHost.replace(/\D/g, ''),
					contactParent: values.contactParent.replace(/\D/g, ''),
				},
			},
			{
				onSuccess: () => {
					reset()
					setSelectedParticipant(null)
					toast.success('Participante atualizado com sucesso!')
					overlayClose(drawerId)
				},
				onError: () => toast.error('Erro ao atualizar participante'),
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
			headingTitle="Dados do participante"
			handleClose={() => setSelectedParticipant(null)}
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
				<InputField fieldName="parent">
					Nome do responsável ou parente
				</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contactParent">
					Telefone do responsável ou parente
				</MaskedInputField>
				<InputField fieldName="relationship">
					Parentesco (ex: mãe, tio, avó...)
				</InputField>
				<InputField fieldName="host">Nome de quem te convidou</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contactHost">
					Telefone de quem te convidou
				</MaskedInputField>
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
