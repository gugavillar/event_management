import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { ListPage, PageContent } from '@/components/Organisms'

const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => ({
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		email: faker.internet.email(),
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
]

export const Participants = () => {
	return (
		<PageContent subheadingPage="Listagem de participantes">
			<ListPage
				bodyData={FAKE_PARTICIPANTES()}
				headerLabels={HEADER_LABELS}
				placeholderField="Encontrar um participante"
			/>
		</PageContent>
	)
}
