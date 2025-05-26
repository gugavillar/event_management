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
import { overlayClose, UF, YES_OR_NO_SELECT_OPTIONS } from '@/constants'
import { formatDateToSendToApi } from '@/formatters'
import { useGetCities } from '@/services/queries/cities'
import {
	useGetParticipant,
	useUpdateParticipant,
} from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { ParticipantType } from './ParticipantDrawer.schema'

type ParticipantDrawerProps = {
	drawerId: string
	selectedParticipant: null | ParticipantsAPI['id']
	setSelectedParticipant: Dispatch<SetStateAction<ParticipantsAPI['id'] | null>>
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
		watch,
		formState: { isValid, isDirty },
	} = useFormContext<ParticipantType>()
	const { isPending, update } = useUpdateParticipant()

	const selectedUF = watch('address.state')
	const hasReligion = watch('hasReligion')

	const { data: cities } = useGetCities({
		nome: selectedUF,
	})

	const handleSubmitForm: SubmitHandler<ParticipantType> = async (values) => {
		if (!selectedParticipant) return

		const { hasReligion, religion, ...data } = values

		const formattedData = {
			...data,
			...(hasReligion === 'Yes' && { religion }),
			birthdate: formatDateToSendToApi(data.birthdate),
			phone: data.phone.replace(/\D/g, ''),
			hostPhone: data.hostPhone.replace(/\D/g, ''),
			responsiblePhone: data.responsiblePhone.replace(/\D/g, ''),
		}

		await update(
			{
				participantId: selectedParticipant,
				data: {
					...formattedData,
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
				<InputField fieldName="called">
					Como você gostaria de ser chamado(a)?
				</InputField>
				<InputField fieldName="email">E-mail</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="phone">
					Telefone
				</MaskedInputField>
				<MaskedInputField format="##/##/####" fieldName="birthdate">
					Data de nascimento
				</MaskedInputField>
				<SelectField
					fieldName="hasReligion"
					placeholder="Selecione uma opção"
					options={YES_OR_NO_SELECT_OPTIONS}
				>
					Tem religião?
				</SelectField>
				{hasReligion === 'Yes' && (
					<InputField fieldName="religion">Qual?</InputField>
				)}
				<InputField fieldName="responsible">Responsável</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="responsiblePhone">
					Telefone responsável
				</MaskedInputField>

				<InputField fieldName="host">Quem convidou</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="hostPhone">
					Telefone quem convidou
				</MaskedInputField>
				<InputField fieldName="address.street">Endereço</InputField>
				<InputField fieldName="address.number">Número</InputField>
				<SelectField
					fieldName="address.state"
					placeholder="Selecione o estado"
					options={UF}
				>
					Estado
				</SelectField>
				<SelectField
					fieldName="address.city"
					placeholder="Selecione a cidade"
					options={cities ?? []}
				>
					Cidade
				</SelectField>
				<InputField fieldName="address.neighborhood">Bairro</InputField>
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
