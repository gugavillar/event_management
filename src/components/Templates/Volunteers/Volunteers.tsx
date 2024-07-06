import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { ListPage, PageContent } from '@/components/Organisms'

const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => ({
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		role: faker.person.jobArea(),
		phone: faker.phone.number(),
		birthdate: faker.date.birthdate().toISOString(),
	}))
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
	return (
		<PageContent subheadingPage="Listagem de voluntários">
			<ListPage
				bodyData={FAKE_PARTICIPANTES()}
				headerLabels={HEADER_LABELS}
				placeholderField="Encontrar um voluntário"
			/>
		</PageContent>
	)
}
