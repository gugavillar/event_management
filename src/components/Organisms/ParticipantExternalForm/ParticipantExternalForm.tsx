'use client'

import { useFormContext } from 'react-hook-form'

import {
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { YES_OR_NO_SELECT_OPTIONS } from '@/constants'

export const ParticipantExternalForm = () => {
	const { watch } = useFormContext()
	const hasReligion = watch('hasReligion')
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="name">Nome completo</InputField>
				<InputField fieldName="called">
					Como você gostaria de ser chamado(a)?
				</InputField>
				<InputField fieldName="email">E-mail</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contact">
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
				{hasReligion === 'Sim' && (
					<InputField fieldName="religion">Qual?</InputField>
				)}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="parent">Responsável</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contactParent">
					Telefone
				</MaskedInputField>

				<InputField fieldName="host">Quem convidou</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="contactHost">
					Telefone
				</MaskedInputField>
			</div>
		</div>
	)
}
