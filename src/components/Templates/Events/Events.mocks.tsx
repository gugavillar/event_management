import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { GenderType, GenderTypeAPI } from '@/constants/status'

const getGender = (gender: GenderTypeAPI) => {
	return GenderType[gender].label
}

export const FAKE_EVENTS = () => {
	return Array.from({ length: 10 }, () => {
		const genderStatus = Math.floor(Math.random() * 3) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.commerce.department(),
			initialDate: faker.date.between('2024-01-01', '2024-12-31').toISOString(),
			finalDate: faker.date.between('2024-01-01', '2024-12-31').toISOString(),
			gender: getGender(genderStatus),
		}
	})
}
