import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { GenderType, GenderTypeAPI } from '@/constants/status'
import { currencyValue, formatToBrazilianDate } from '@/formatters'

const getGender = (gender: GenderTypeAPI) => {
	return GenderType[gender].label
}

export const FAKE_EVENTS = () => {
	return Array.from({ length: 10 }, () => {
		const genderStatus = Math.floor(Math.random() * 3) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.commerce.department(),
			initialDate: formatToBrazilianDate(
				faker.date.between('2024-01-01', '2024-01-10').toISOString(),
			),
			finalDate: formatToBrazilianDate(
				faker.date.between('2024-01-11', '2024-01-31').toISOString(),
			),
			participantValue: currencyValue(
				faker.number.float({ min: 100.0, max: 200.0 }),
			),
			volunteerValue: currencyValue(
				faker.number.float({ min: 100.0, max: 200.0 }),
			),
			gender: getGender(genderStatus),
		}
	})
}
