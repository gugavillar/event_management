import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

export const FAKE_PARTICIPANTES = (groupNumber: number) => {
	return Array.from({ length: 10 }, () => {
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			group: `Grupo ${groupNumber}`,
		}
	})
}

export const FAKE_LEADERS = () => {
	return Array.from({ length: 10 }, () => {
		return {
			value: faker.string.uuid() as UUID,
			label: faker.person.fullName(),
		}
	})
}
