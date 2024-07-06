import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { PaymentTag, Select } from '@/components/Atoms'
import { ListPage, PageContent } from '@/components/Organisms'
import { PaymentType, PaymentTypeAPI } from '@/constants'

const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => {
		const status = Math.floor(Math.random() * 3) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			phone: faker.phone.number(),
			birthdate: faker.date.birthdate().toISOString(),
			payment: <PaymentTag status={status} />,
		}
	})
}

const HEADER_LABELS = [
	{
		label: 'Nome',
		accessor: 'name',
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
		accessor: 'payment',
	},
]

export const Payments = () => {
	return (
		<PageContent subheadingPage="Listagem de colaboradores do evento">
			<ListPage
				bodyData={FAKE_PARTICIPANTES()}
				headerLabels={HEADER_LABELS}
				placeholderField="Encontrar um colaborador"
				className="lg:max-w-screen-lg"
			>
				<Select
					defaultValue=""
					placeholder="Selecione o status"
					options={[
						{
							label: PaymentType[PaymentTypeAPI.CARD].label,
							value: PaymentTypeAPI.CARD,
						},
						{
							label: PaymentType[PaymentTypeAPI.CASH].label,
							value: PaymentTypeAPI.CASH,
						},
						{
							label: PaymentType[PaymentTypeAPI.PIX].label,
							value: PaymentTypeAPI.PIX,
						},
					]}
				/>
			</ListPage>
		</PageContent>
	)
}
