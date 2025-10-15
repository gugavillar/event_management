'use client'
import { type Dispatch, memo, type SetStateAction, useEffect } from 'react'
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
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'
import { generateToastError } from '@/utils/errors'
import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'
import type { VolunteerType } from './VolunteerDrawer.schema'

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
			formState: { isValid, isDirty, errors },
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
			'id'
		)

		const lastItemRef = useInfiniteScrollObserver({
			fetchNextPage,
			hasNextPage: Boolean(hasNextPage),
			isFetchingNextPage,
		})

		const handleSubmitForm: SubmitHandler<VolunteerType> = async (values) => {
			if (!values) return

			const { hasCell, cell, hasHealth, health, ...data } = values

			const formattedData = {
				...data,
				...(hasCell === 'Yes' ? { cell } : { cell: null }),
				...(hasHealth === 'Yes' ? { health } : { health: null }),
				birthdate: formatDateToSendToApi(values.birthdate),
				phone: values.phone.replace(/\D/g, ''),
				relativePhone: values.relativePhone.replace(/\D/g, ''),
				...(!selectedVolunteer && { inscriptionType: 'internal' as const }),
			}

			if (selectedVolunteer) {
				return await update(
					{
						data: {
							...formattedData,
						},
						volunteerId: selectedVolunteer,
					},
					{
						onError: () => toast.error('Erro ao atualizar voluntário'),
						onSuccess: () => {
							reset()
							setSelectedVolunteer(null)
							toast.success('Voluntário atualizado com sucesso!')
							overlayClose(drawerId)
						},
					}
				)
			}
			await create(
				{
					...formattedData,
				},
				{
					onError: (error) =>
						generateToastError(error, 'Erro ao criar voluntário'),
					onSuccess: () => {
						reset()
						setSelectedVolunteer(null)
						toast.success('Voluntário criado com sucesso!')
						overlayClose(drawerId)
					},
				}
			)
		}

		const handleClose = () => {
			reset()
			setSelectedVolunteer(null)
		}

		useEffect(() => {
			if (!data) return reset({}, { keepDefaultValues: true })

			reset({ ...data }, { keepDefaultValues: true })
		}, [data, reset])

		return (
			<Drawer
				drawerId={drawerId}
				handleClose={handleClose}
				headingTitle="Dados do voluntário"
			>
				<DrawerBody isLoading={isLoading}>
					<Controller
						control={control}
						name="eventId"
						render={({ field }) => (
							<SearchBox
								error={errors.eventId?.message}
								keyOptionLabel="label"
								keyOptionValue="value"
								label="Evento"
								lastItemRef={lastItemRef}
								options={formattedEvents}
								search={search}
								selectedValue={field.value}
								setSearch={setSearch}
								setSelectedValue={field.onChange}
							/>
						)}
					/>
					<InputField fieldName="name">Nome completo</InputField>
					<InputField fieldName="called">
						Como você gostaria de ser chamado(a)?
					</InputField>
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
					<SelectField
						fieldName="hasCell"
						options={YES_OR_NO_SELECT_OPTIONS}
						placeholder="Selecione uma opção"
					>
						Participa de célula?
					</SelectField>
					{hasCell === 'Yes' && <InputField fieldName="cell">Qual?</InputField>}
					<SelectField
						fieldName="hasHealth"
						options={YES_OR_NO_SELECT_OPTIONS}
						placeholder="Selecione uma opção"
					>
						Tem restrição saúde/alimentar?
					</SelectField>
					{hasHealth === 'Yes' && (
						<InputField fieldName="health">Descreva?</InputField>
					)}
					<InputField fieldName="relative">Parente próximo</InputField>
					<MaskedInputField fieldName="relativePhone" format="(##) #####-####">
						Telefone do parente
					</MaskedInputField>
					<InputField fieldName="address.street">Endereço</InputField>
					<InputField fieldName="address.number">Número</InputField>
					<SelectField
						fieldName="address.state"
						options={UF}
						placeholder="Selecione o estado"
					>
						Estado
					</SelectField>
					<SelectField
						fieldName="address.city"
						options={cities ?? []}
						placeholder="Selecione a cidade"
					>
						Cidade
					</SelectField>
					<InputField fieldName="address.neighborhood">Bairro</InputField>
				</DrawerBody>
				<DrawerFooter>
					<Button
						className="w-full items-center justify-center border-transparent bg-teal-500 text-base text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-slate-800"
						disabled={!isValid || !isDirty}
						isLoading={isCreating || isUpdating}
						onClick={handleSubmit(handleSubmitForm)}
						type="submit"
					>
						Salvar
					</Button>
				</DrawerFooter>
			</Drawer>
		)
	}
)

VolunteerDrawer.displayName = 'VolunteerDrawer'
