import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { PaymentTag } from '@/components/Atoms'

export const FAKE_PARTICIPANTES = () => {
	return Array.from({ length: 10 }, () => {
		const status = Math.floor(Math.random() * 4) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			phone: faker.phone.number(),
			birthdate: faker.date.birthdate().toISOString(),
			payment: <PaymentTag status={status} />,
		}
	})
}
