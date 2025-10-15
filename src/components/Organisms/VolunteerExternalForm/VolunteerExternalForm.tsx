'use client'

import { useFormContext } from 'react-hook-form'

import { InputField, MaskedInputField, SelectField } from '@/components/Molecules'
import type { FullSchemaType } from '@/components/Templates/ExternalVolunteerForm/ExternalVolunteerForm.schema'
import { YES_OR_NO_SELECT_OPTIONS } from '@/constants'

export const VolunteerExternalForm = () => {
	const { watch } = useFormContext<FullSchemaType>()
	const hasCell = watch('hasCell')
	const hasHealth = watch('hasHealth')
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
				<InputField fieldName="community">Igreja que frequenta</InputField>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField fieldName="hasCell" options={YES_OR_NO_SELECT_OPTIONS} placeholder="Selecione uma opção">
					Participa de célula?
				</SelectField>
				{hasCell === 'Yes' && <InputField fieldName="cell">Qual?</InputField>}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<SelectField fieldName="hasHealth" options={YES_OR_NO_SELECT_OPTIONS} placeholder="Selecione uma opção">
					Tem restrição saúde/alimentar?
				</SelectField>
				{hasHealth === 'Yes' && <InputField fieldName="health">Descreva?</InputField>}
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<InputField fieldName="relative">Parente próximo</InputField>
				<MaskedInputField fieldName="relativePhone" format="(##) #####-####">
					Telefone do parente
				</MaskedInputField>
			</div>
		</div>
	)
}
