'use client'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

import { CheckboxField, InputField, SelectField } from '@/components/Molecules'
import { FullSchemaType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import { MEMBERS, UF } from '@/constants'
import { useGetCities } from '@/services/queries/cities'

type AddressExternalFormProps = {
	type: MEMBERS
}

const generateLink = (type: MEMBERS) => {
	const label =
		type === MEMBERS.PARTICIPANT
			? 'termo de participação'
			: 'termo de voluntariado'
	const link =
		type === MEMBERS.PARTICIPANT
			? '/terms/termo-participantes.pdf'
			: '/terms/termo-voluntarios.pdf'
	return (
		<Link className="text-sky-500 underline" href={link} target="_blank">
			{label}
		</Link>
	)
}

export const AddressExternalForm = ({ type }: AddressExternalFormProps) => {
	const { watch } = useFormContext<FullSchemaType>()

	const selectedUF = watch('address.state')

	const { data: cities } = useGetCities({
		nome: selectedUF,
	})

	const checkboxLabel =
		type === MEMBERS.PARTICIPANT ? (
			<span>Li e concordo com os {generateLink(type)}</span>
		) : (
			<span>Li e concordo com os {generateLink(type)}</span>
		)

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
			<CheckboxField
				fieldClassName="md:col-span-2 mt-2"
				fieldName="terms"
				label={checkboxLabel}
			/>
		</div>
	)
}
