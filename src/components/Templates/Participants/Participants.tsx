'use client'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { Button, StatusTag, TableProps } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	AddressInfoCard,
	FamilyContactInfo,
	HealthInfoCard,
	ListPage,
	PageContent,
	PersonalInfoCard,
} from '@/components/Organisms'

const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => {
		const status = Math.floor(Math.random() * 3) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			email: faker.internet.email(),
			phone: faker.phone.number(),
			birthdate: faker.date.birthdate().toISOString(),
			status: status > 2 ? '' : <StatusTag status={status} />,
		}
	})
}

const MOCKED_USER = {
	name: faker.person.fullName(),
	firstName: faker.person.firstName(),
	birthdate: faker.date.birthdate().toISOString(),
	phone: faker.phone.number(),
	responsible: Array.from({ length: 2 }, () => ({
		name: faker.person.fullName(),
		phone: faker.phone.number(),
	})),
	address: {
		street: faker.location.streetAddress(),
		city: faker.location.city(),
		number: faker.location.buildingNumber(),
	},
	healthInfo: 'Alergias',
}

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Email',
		accessor: 'email',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
	{
		label: 'Status',
		accessor: 'status',
	},
]

export const Participants = () => {
	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById('volunteer-manager') as HTMLElement,
		)
	}
	return (
		<PageContent subheadingPage="Listagem de participantes">
			<ListPage placeholderField="Encontrar um participante">
				<ListManager
					handleClickRow={handleClickRow}
					bodyData={FAKE_PARTICIPANTES()}
					headerLabels={HEADER_LABELS}
					drawerId="volunteer-manager"
					drawerTitle="Dados do participante"
					drawerFooter={
						<>
							<Button className="w-full justify-center bg-red-500 text-gray-50 transition-colors duration-500 hover:bg-red-400 hover:text-gray-800">
								Cancelar participação
							</Button>
							<Button className="w-full justify-center bg-teal-500 text-gray-50 transition-colors duration-500 hover:bg-teal-400 hover:text-gray-800">
								Confirmar participação
							</Button>
						</>
					}
					drawerContent={
						<>
							<PersonalInfoCard userInfo={MOCKED_USER} />
							<AddressInfoCard addressInfo={MOCKED_USER.address} />
							{MOCKED_USER.responsible.length ? (
								<FamilyContactInfo responsibleInfo={MOCKED_USER.responsible} />
							) : null}
							{MOCKED_USER.healthInfo ? (
								<HealthInfoCard healthInfo={MOCKED_USER.healthInfo} />
							) : null}
						</>
					}
				/>
			</ListPage>
		</PageContent>
	)
}
