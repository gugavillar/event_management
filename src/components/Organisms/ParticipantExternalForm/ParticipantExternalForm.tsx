'use client'

import { useFormContext } from 'react-hook-form'

import { InputField, MaskedInputField, SelectField } from '@/components/Molecules'
import type { FullSchemaType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import { YES_OR_NO_SELECT_OPTIONS } from '@/constants'

type ParticipantExternalFormProps = {
	isNotHappening?: boolean
}

export const ParticipantExternalForm = ({ isNotHappening }: ParticipantExternalFormProps) => {
	const { watch } = useFormContext<FullSchemaType>()
	const hasReligion = watch('hasReligion')
	const hasHealth = watch('hasHealth')
	const fieldResponsibleLabel = isNotHappening ? 'Parente próximo' : 'Responsável'
	const filedResponsiblePhoneLabel = isNotHappening ? 'Telefone parente' : 'Telefone responsável'
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="name">Nome completo</InputField>
				<InputField fieldName="called">Como você gostaria de ser chamado(a)?</InputField>
				<InputField fieldName="email" type="email">
					E-mail
				</InputField>
				<MaskedInputField fieldName="phone" format="(##) #####-####">
					Telefone
				</MaskedInputField>
				<MaskedInputField fieldName="birthdate" format="##/##/####">
					Data de nascimento
				</MaskedInputField>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField fieldName="hasReligion" options={YES_OR_NO_SELECT_OPTIONS} placeholder="Selecione uma opção">
					Tem religião?
				</SelectField>
				{hasReligion === 'Yes' && <InputField fieldName="religion">Qual?</InputField>}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField fieldName="hasHealth" options={YES_OR_NO_SELECT_OPTIONS} placeholder="Selecione uma opção">
					Tem restrição saúde/alimentar?
				</SelectField>
				{hasHealth === 'Yes' && <InputField fieldName="health">Descreva?</InputField>}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="responsible">{fieldResponsibleLabel}</InputField>
				<MaskedInputField fieldName="responsiblePhone" format="(##) #####-####">
					{filedResponsiblePhoneLabel}
				</MaskedInputField>

				<InputField fieldName="host">Quem convidou</InputField>
				<MaskedInputField fieldName="hostPhone" format="(##) #####-####">
					Telefone quem convidou
				</MaskedInputField>
			</div>
		</div>
	)
}
