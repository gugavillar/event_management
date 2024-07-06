'use client'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { Button, TableProps } from '@/components/Atoms'
import { ListManager } from '@/components/Molecules'
import {
	ListPage,
	PageContent,
	PersonalInfoCard,
	AddressInfoCard,
} from '@/components/Organisms'

const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => ({
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		role: faker.person.jobArea(),
		phone: faker.phone.number(),
		birthdate: faker.date.birthdate().toISOString(),
	}))
}

const MOCKED_USER = {
	name: faker.person.fullName(),
	firstName: faker.person.firstName(),
	birthdate: faker.date.birthdate().toISOString(),
	phone: faker.phone.number(),
	responsibleOne: faker.person.fullName(),
	responsibleTwo: faker.person.fullName(),
	responsiblePhone: faker.phone.number(),
	address: {
		street: faker.location.streetAddress(),
		city: faker.location.city(),
		number: faker.location.buildingNumber(),
	},
}

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
	},
	{
		label: 'Função',
		accessor: 'role',
	},
	{
		label: 'Telefone',
		accessor: 'phone',
	},
	{
		label: 'Data de nascimento',
		accessor: 'birthdate',
	},
]

export const Volunteers = () => {
	const handleClickRow = async ({ id }: TableProps['bodyData'][number]) => {
		console.log(id)
		const overlay = await import('preline/preline')
		overlay.HSOverlay.open(
			document.getElementById('volunteer-manager') as HTMLElement,
		)
	}

	return (
		<PageContent subheadingPage="Listagem de voluntários">
			<ListPage placeholderField="Encontrar um voluntário">
				<ListManager
					handleClickRow={handleClickRow}
					bodyData={FAKE_PARTICIPANTES()}
					headerLabels={HEADER_LABELS}
					drawerId="volunteer-manager"
					drawerTitle="Dados do voluntário"
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
						</>
					}
				/>
			</ListPage>
		</PageContent>
	)
}
