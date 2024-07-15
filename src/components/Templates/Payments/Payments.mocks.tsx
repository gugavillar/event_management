import { faker } from '@faker-js/faker/locale/pt_BR'

import { UUID } from 'crypto'

import { PaymentTag } from '@/components/Atoms'
import { currencyValue } from '@/formatters'

export const FAKE_COLLABORATORS = () => {
	return Array.from({ length: 10 }, () => {
		const status = Math.floor(Math.random() * 4) + 1
		const collaboratorType = Math.floor(Math.random() * 2) + 1
		return {
			id: faker.string.uuid() as UUID,
			name: faker.person.fullName(),
			phone: faker.phone.number(),
			valuePayed: currencyValue(faker.number.float({ min: 100.0, max: 200.0 })),
			collaboratorType: collaboratorType === 1 ? 'Voluntário' : 'Participante',
			payment: <PaymentTag status={status} />,
		}
	})
}
