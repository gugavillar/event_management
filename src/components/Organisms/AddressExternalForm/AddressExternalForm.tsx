import { useFormContext } from 'react-hook-form'

import { InputField, SelectField } from '@/components/Molecules'
import { UF } from '@/constants'
import { useGetCities } from '@/services/queries/cities'

export const AddressExternalForm = () => {
	const { watch } = useFormContext()

	const selectedUF = watch('state')

	const { data: cities } = useGetCities({
		nome: selectedUF,
	})
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
			<InputField fieldName="address">Endereço</InputField>
			<InputField fieldName="number">Número</InputField>
			<SelectField
				fieldName="state"
				placeholder="Selecione o estado"
				options={UF}
			>
				Estado
			</SelectField>
			<SelectField
				fieldName="city"
				placeholder="Selecione a cidade"
				options={cities ?? []}
			>
				Cidade
			</SelectField>
			<InputField fieldName="neighborhood">Bairro</InputField>
		</div>
	)
}
