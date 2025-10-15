import { eventPermitCreateRegistration, generatePage } from './functions'
import { MEMBERS } from './status'

describe('functions', () => {
	test('generatePage return number 1 when page is undefined', () => {
		const page = generatePage(undefined)
		expect(page).toBe(1)
	})

	test('generatePage return number when page is defined', () => {
		const page = generatePage('1')
		expect(page).toBe(1)
	})

	test('eventPermitCreateRegistration return false when event is undefined', () => {
		const isRegistrationOpen = eventPermitCreateRegistration(undefined, MEMBERS.PARTICIPANT)
		expect(isRegistrationOpen).toBe(false)
	})

	test('eventPermitCreateRegistration return false when event initialDate not future', () => {
		const isRegistrationOpen = eventPermitCreateRegistration(
			{
				initialDate: '01/01/2000',
			},
			MEMBERS.PARTICIPANT
		)
		expect(isRegistrationOpen).toBe(false)
	})

	test('eventPermitCreateRegistration return true when event initialDate is future and participant registration open', () => {
		const today = new Date()
		const future = `${today.getFullYear() + 1}-${today.getMonth()}-${today.getDay()}`
		const isRegistrationOpen = eventPermitCreateRegistration(
			{
				initialDate: future,
				isParticipantRegistrationOpen: true,
			},
			MEMBERS.PARTICIPANT
		)
		expect(isRegistrationOpen).toBe(true)
	})

	test('eventPermitCreateRegistration return true when event initialDate is future and volunteer registration open', () => {
		const today = new Date()
		const future = `${today.getFullYear() + 1}-${today.getMonth()}-${today.getDay()}`
		const isRegistrationOpen = eventPermitCreateRegistration(
			{
				initialDate: future,
				isVolunteerRegistrationOpen: true,
			},
			MEMBERS.VOLUNTEER
		)
		expect(isRegistrationOpen).toBe(true)
	})

	test('eventPermitCreateRegistration return false when event initialDate is future and participant registration close', () => {
		const today = new Date()
		const future = `${today.getFullYear() + 1}-${today.getMonth()}-${today.getDay()}`
		const isRegistrationOpen = eventPermitCreateRegistration(
			{
				initialDate: future,
				isParticipantRegistrationOpen: false,
			},
			MEMBERS.PARTICIPANT
		)
		expect(isRegistrationOpen).toBe(false)
	})

	test('eventPermitCreateRegistration return false when event initialDate is future and volunteer registration close', () => {
		const today = new Date()
		const future = `${today.getFullYear() + 1}-${today.getMonth()}-${today.getDay()}`
		const isRegistrationOpen = eventPermitCreateRegistration(
			{
				initialDate: future,
				isVolunteerRegistrationOpen: false,
			},
			MEMBERS.VOLUNTEER
		)
		expect(isRegistrationOpen).toBe(false)
	})
})
