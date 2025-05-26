'use client'

import { useFormContext } from 'react-hook-form'

import {
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { ExternalParticipantFormType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import { YES_OR_NO_SELECT_OPTIONS } from '@/constants'

export const ParticipantExternalForm = () => {
	const { watch } = useFormContext<ExternalParticipantFormType>()
	const hasReligion = watch('hasReligion')
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="responsible">Responsável</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="responsiblePhone">
					Telefone responsável
				</MaskedInputField>

				<InputField fieldName="host">Quem convidou</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="hostPhone">
					Telefone quem convidou
				</MaskedInputField>
			</div>
		</div>
	)
}
