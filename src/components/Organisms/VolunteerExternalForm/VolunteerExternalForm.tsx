'use client'

import { useFormContext } from 'react-hook-form'

import {
	InputField,
	MaskedInputField,
	SelectField,
} from '@/components/Molecules'
import { ExternalVolunteerFormType } from '@/components/Templates/ExternalVolunteerForm/ExternalVolunteerForm.schema'
import { YES_OR_NO_SELECT_OPTIONS } from '@/constants'

export const VolunteerExternalForm = () => {
	const { watch } = useFormContext<ExternalVolunteerFormType>()
	const hasCell = watch('hasCell')
	const hasHealth = watch('hasHealth')
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="name">Nome completo</InputField>
				<InputField fieldName="called">
					Como você gostaria de ser chamado(a)?
				</InputField>
				<InputField type="email" fieldName="email">
					E-mail
				</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="phone">
					Telefone
				</MaskedInputField>
				<MaskedInputField format="##/##/####" fieldName="birthdate">
					Data de nascimento
				</MaskedInputField>
				<InputField fieldName="community">Igreja que frequenta</InputField>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField
					fieldName="hasCell"
					placeholder="Selecione uma opção"
					options={YES_OR_NO_SELECT_OPTIONS}
				>
					Participa de célula?
				</SelectField>
				{hasCell === 'Yes' && <InputField fieldName="cell">Qual?</InputField>}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField
					fieldName="hasHealth"
					placeholder="Selecione uma opção"
					options={YES_OR_NO_SELECT_OPTIONS}
				>
					Tem restrição saúde/alimentar?
				</SelectField>
				{hasHealth === 'Yes' && (
					<InputField fieldName="health">Descreva?</InputField>
				)}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="relative">Parente próximo</InputField>
				<MaskedInputField format="(##) #####-####" fieldName="relativePhone">
					Telefone do parente
				</MaskedInputField>
			</div>
		</div>
	)
}
