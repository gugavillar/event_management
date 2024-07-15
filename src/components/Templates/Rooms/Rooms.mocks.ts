import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

export const FAKE_COLLABORATORS = () => {
	const data = Array.from({ length: 10 }, () => ({
		id: faker.string.uuid() as UUID,
		name: faker.person.fullName(),
		room: faker.number.int({ min: 1, max: 36 }),
	}))
	return {
		number: faker.number.int({ min: 1, max: 36 }),
		data,
	}
}
