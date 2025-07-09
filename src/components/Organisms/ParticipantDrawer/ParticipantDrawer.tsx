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
	useCreateParticipant,
	useGetParticipant,
	useUpdateParticipant,
} from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'
import { generateToastError } from '@/utils/errors'

import { ParticipantType } from './ParticipantDrawer.schema'

type ParticipantDrawerProps = {
	drawerId: string
	selectedParticipant: null | ParticipantsAPI['id']
	setSelectedParticipant: Dispatch<SetStateAction<ParticipantsAPI['id'] | null>>
}

export const ParticipantDrawer = memo(
	({
		drawerId,
		selectedParticipant,
		setSelectedParticipant,
	}: ParticipantDrawerProps) => {
		const { data, isLoading } = useGetParticipant(selectedParticipant)
		const {
			handleSubmit,
			reset,
			watch,
			control,
			formState: { isValid, isDirty, errors },
		} = useFormContext<ParticipantType>()
		const {
			data: events,
			hasNextPage,
			isFetchingNextPage,
			fetchNextPage,
			search,
			setSearch,
		} = useGetInfinityEvents()
		const { isPending: isUpdating, update } = useUpdateParticipant()
		const { isPending: isCreating, create } = useCreateParticipant()

		const selectedUF = watch('address.state')
		const hasReligion = watch('hasReligion')
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

		const handleSubmitForm: SubmitHandler<ParticipantType> = async (values) => {
			if (!values) return

			const { hasReligion, religion, hasHealth, health, ...data } = values

			const formattedData = {
				...data,
				...(hasReligion === 'Yes' ? { religion } : { religion: null }),
				...(hasHealth === 'Yes' ? { health } : { health: null }),
				birthdate: formatDateToSendToApi(data.birthdate),
				phone: data.phone.replace(/\D/g, ''),
				hostPhone: data.hostPhone.replace(/\D/g, ''),
				responsiblePhone: data.responsiblePhone.replace(/\D/g, ''),
				inscriptionType: 'internal' as const,
			}

			if (selectedParticipant) {
				return await update(
					{
						participantId: selectedParticipant,
						data: {
							...formattedData,
						},
					},
					{
						onSuccess: () => {
							reset()
							setSelectedParticipant(null)
							toast.success('Participante atualizado com sucesso!')
							overlayClose(drawerId)
						},
						onError: () => toast.error('Erro ao atualizar participante'),
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
						setSelectedParticipant(null)
						toast.success('Participante criado com sucesso!')
						overlayClose(drawerId)
					},
					onError: (error) =>
						generateToastError(error, 'Erro ao criar participante'),
				},
			)
		}

		useEffect(() => {
			if (!data) return reset({}, { keepDefaultValues: true })

			reset({ ...data }, { keepDefaultValues: true })
		}, [data, reset])

		return (
			<Drawer
				drawerId={drawerId}
				headingTitle="Dados do participante"
				handleClose={() => setSelectedParticipant(null)}
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
								error={errors.eventId?.message}
							/>
						)}
					/>
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
					<InputField fieldName="responsible">Responsável</InputField>
					<MaskedInputField
						format="(##) #####-####"
						fieldName="responsiblePhone"
					>
						Telefone responsável
					</MaskedInputField>

					<InputField fieldName="host">Quem convidou</InputField>
					<MaskedInputField format="(##) #####-####" fieldName="hostPhone">
						Telefone quem convidou
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
						isLoading={isUpdating || isCreating}
						disabled={!isValid || !isDirty}
					>
						Salvar
					</Button>
				</DrawerFooter>
			</Drawer>
		)
	},
)

ParticipantDrawer.displayName = 'ParticipantDrawer'
