import { faker } from '@faker-js/faker'
import { NextRequest, NextResponse } from 'next/server'

import { setTimeout } from 'timers/promises'

const generateData = (event: string) => {
	if (event === '1') {
		return {
			participants: faker.number.int({ min: 1, max: 1000 }),
			volunteers: faker.number.int({ min: 1, max: 1000 }),
			paidInscriptions: faker.number.int({ min: 1, max: 1000 }),
			confirmedInscriptions: {
				participants: faker.number.int({ min: 1, max: 1000 }),
				volunteers: faker.number.int({ min: 1, max: 1000 }),
			},
		}
	}
	return {
		participants: faker.number.int({ min: 50, max: 100 }),
		volunteers: faker.number.int({ min: 50, max: 100 }),
		paidInscriptions: faker.number.int({ min: 50, max: 100 }),
		confirmedInscriptions: {
			participants: faker.number.int({ min: 50, max: 100 }),
			volunteers: faker.number.int({ min: 50, max: 100 }),
		},
	}
}

const handlerGet = async (req: NextRequest) => {
	const event = req.nextUrl.searchParams.get('event')
	await setTimeout(4000)
	if (!event) {
		return
	}
	const dashboardCards = generateData(event)

	console.log(dashboardCards)

	return NextResponse.json(dashboardCards)
}

export { handlerGet as GET }
