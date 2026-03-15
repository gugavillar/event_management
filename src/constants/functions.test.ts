import {
	deepTrim,
	eventPermitCreateRegistration,
	generatePage,
	generatePrintKey,
	interestedListPermitCreateRegistration,
	validatePagePermission,
} from './functions'
import { MEMBERS, ROLES } from './status'

describe('functions', () => {
	describe('generatePage function', () => {
		test('generatePage return number 1 when page is undefined', () => {
			const page = generatePage(undefined)
			expect(page).toBe(1)
		})

		test('generatePage return number when page is defined', () => {
			const page = generatePage('1')
			expect(page).toBe(1)
		})
	})

	describe('eventPermitCreateRegistration function', () => {
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
			const future = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
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
			const future = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
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
			const future = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
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
			const future = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
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

	describe('interestedListPermitCreateRegistration function', () => {
		test('interestedListPermitCreateRegistration return false when event is undefined', () => {
			const isRegistrationOpen = interestedListPermitCreateRegistration(undefined)
			expect(isRegistrationOpen).toBe(false)
		})

		test('interestedListPermitCreateRegistration return false when isInterestedListOpen is false', () => {
			const isRegistrationOpen = interestedListPermitCreateRegistration({
				isInterestedListOpen: false,
			})
			expect(isRegistrationOpen).toBe(false)
		})

		test('interestedListPermitCreateRegistration return true when isInterestedListOpen is true and initialDate is future', () => {
			const today = new Date()
			const future = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`
			const isRegistrationOpen = interestedListPermitCreateRegistration({
				initialDate: future,
				isInterestedListOpen: true,
			})
			expect(isRegistrationOpen).toBe(true)
		})
	})

	describe('validatePagePermission function', () => {
		test('should return true when user has permission', () => {
			const hasPagePermission = validatePagePermission(ROLES.ADMIN, [ROLES.ADMIN])
			expect(hasPagePermission).toBe(true)
		})

		test('should return false when user has no permission', () => {
			const hasPagePermission = validatePagePermission(ROLES.USER, [ROLES.ADMIN])
			expect(hasPagePermission).toBe(false)
		})
	})

	describe('generatePrintKey function', () => {
		test('should return string with list type', () => {
			const key = generatePrintKey([{ id: 'any-id', members: [{ id: 'any-id' }] }], 'any-list-type')
			expect(key).toBe('any-id:1-any-list-type')
		})

		test('should return string without list type', () => {
			const key = generatePrintKey([{ id: 'any-id', members: [{ id: 'any-id' }] }])
			expect(key).toBe('any-id:1')
		})
	})

	describe('deepTrim function', () => {
		test('should return string trim', () => {
			const mockData = {
				id: 'any-id    ',
				name: 'any-name    ',
			}
			const trim = deepTrim(mockData)
			expect(trim).toStrictEqual({
				id: 'any-id',
				name: 'any-name',
			})
		})

		test('should return string trim when is array', () => {
			const mockData = {
				id: 'any-id    ',
				members: [
					{
						id: 'any-id-member    ',
						name: 'any-name-member    ',
					},
				],
				name: 'any-name    ',
			}
			const trim = deepTrim(mockData)
			expect(trim).toStrictEqual({
				id: 'any-id',
				members: [
					{
						id: 'any-id-member',
						name: 'any-name-member',
					},
				],
				name: 'any-name',
			})
		})
	})
})
