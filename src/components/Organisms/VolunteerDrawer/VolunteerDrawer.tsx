'use client'
import { Dispatch, memo, SetStateAction, useEffect } from 'react'
import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Drawer, DrawerBody, DrawerFooter } from '@/components/Atoms'
import {
	InputField,
	MaskedInputField,
	SearchBox,
	SelectField,
} from '@/components/Molecules'
import { overlayClose, UF, YES_OR_NO_SELECT_OPTIONS } from '@/constants'
import { formatDateToSendToApi, formatterComboBoxValues } from '@/formatters'
import { useInfiniteScrollObserver } from '@/hooks'
import { useGetCities } from '@/services/queries/cities'
import { useGetInfinityEvents } from '@/services/queries/events'
import {
	useCreateVolunteer,
	useGetVolunteer,
	useUpdateVolunteer,
} from '@/services/queries/volunteers'
import { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

import { VolunteerType } from './VolunteerDrawer.schema'

type VolunteerDrawerProps = {
	drawerId: string
	selectedVolunteer: null | VolunteersAPI['id']
	setSelectedVolunteer: Dispatch<SetStateAction<VolunteersAPI['id'] | null>>
}

export const VolunteerDrawer = memo(
	({
		drawerId,
		selectedVolunteer,
		setSelectedVolunteer,
	}: VolunteerDrawerProps) => {
		const { data, isLoading } = useGetVolunteer(selectedVolunteer)
		const { isPending: isUpdating, update } = useUpdateVolunteer()
		const { isPending: isCreating, create } = useCreateVolunteer()
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
			search,
			setSearch,
		} = useGetInfinityEvents()
		const {
			handleSubmit,
			reset,
			watch,
			control,
			formState: { isValid, isDirty },
		} = useFormContext<VolunteerType>()

		const selectedUF = watch('address.state')
		const hasCell = watch('hasCell')
		const hasHealth = watch('hasHealth')

		const { data: cities } = useGetCities({
			nome: selectedUF,
		})

		const formattedEvents = formatterComboBoxValues(
			events?.pages?.flatMap((page) => page.data),
			'name',
			'id',
		)

		const lastItemRef = useInfiniteScrollObserver({
			hasNextPage: Boolean(hasNextPage),
			isFetchingNextPage,
			fetchNextPage,
		})

		const handleSubmitForm: SubmitHandler<VolunteerType> = async (values) => {
			if (!values) return

			const { hasCell, cell, hasHealth, health, ...data } = values

			const formattedData = {
				...data,
				...(hasCell === 'Yes' && { cell }),
				...(hasHealth === 'Yes' && { health }),
				birthdate: formatDateToSendToApi(values.birthdate),
				phone: values.phone.replace(/\D/g, ''),
				relativePhone: values.relativePhone.replace(/\D/g, ''),
			}

			if (selectedVolunteer) {
				return await update(
					{
						volunteerId: selectedVolunteer,
						data: {
							...formattedData,
						},
					},
					{
						onSuccess: () => {
							reset()
							setSelectedVolunteer(null)
							toast.success('Voluntário atualizado com sucesso!')
							overlayClose(drawerId)
						},
						onError: () => toast.error('Erro ao atualizar voluntário'),
					},
				)
			}
			await create(
				{
					...formattedData,
				},
				{
					onSuccess: () => {
						reset()
						setSelectedVolunteer(null)
						toast.success('Voluntário criado com sucesso!')
						overlayClose(drawerId)
					},
					onError: () => toast.error('Erro ao criar voluntário'),
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
				headingTitle="Dados do voluntário"
				handleClose={() => setSelectedVolunteer(null)}
			>
				<DrawerBody isLoading={isLoading}>
					<Controller
						name="eventId"
						control={control}
						render={({ field }) => (
							<SearchBox
								search={search}
								setSearch={setSearch}
								keyOptionLabel="label"
								keyOptionValue="value"
								options={formattedEvents}
								selectedValue={field.value}
								setSelectedValue={field.onChange}
								lastItemRef={lastItemRef}
								label="Evento"
							/>
						)}
					/>
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
					<InputField fieldName="community">Igreja que frequenta</InputField>
					<SelectField
						fieldName="hasCell"
						placeholder="Selecione uma opção"
						options={YES_OR_NO_SELECT_OPTIONS}
					>
						Participa de célula?
					</SelectField>
					{hasCell === 'Yes' && <InputField fieldName="cell">Qual?</InputField>}
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
					<InputField fieldName="relative">Parente próximo</InputField>
					<MaskedInputField format="(##) #####-####" fieldName="relativePhone">
						Telefone do parente
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
						isLoading={isCreating || isUpdating}
						disabled={!isValid || !isDirty}
					>
						Salvar
					</Button>
				</DrawerFooter>
			</Drawer>
		)
	},
)

VolunteerDrawer.displayName = 'VolunteerDrawer'
