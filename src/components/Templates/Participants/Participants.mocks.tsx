import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { StatusTag } from '@/components/Atoms'

export const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => {
		const status = Math.floor(Math.random() * 3) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			phone: faker.phone.number(),
			birthdate: faker.date.birthdate().toISOString(),
			city: faker.location.city(),
			status: status > 2 ? '' : <StatusTag status={status} />,
		}
	})
}

export const MOCKED_USER = {
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
