'use client'
import { useFormContext } from 'react-hook-form'

import { InputField, SelectField } from '@/components/Molecules'
import { FullSchemaType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import { UF } from '@/constants'
import { useGetCities } from '@/services/queries/cities'

export const AddressExternalForm = () => {
	const { watch } = useFormContext<FullSchemaType>()

	const selectedUF = watch('address.state')

	const { data: cities } = useGetCities({
		nome: selectedUF,
	})
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
		</div>
	)
}
