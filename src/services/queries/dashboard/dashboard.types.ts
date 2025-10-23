import type { UUID } from 'node:crypto'

export type DashboardFromAPI = {
	participants: number
	volunteers: number
	confirmedParticipants: number
	confirmedVolunteers: number
	participantPayment: number
	volunteerPayment: number
	paymentsTypes: {
		labels: Array<string>
		data: Array<{
			name: string
			data: Array<number>
		}>
	}
	ageRanges: {
		labels: Array<string>
		data: Array<{
			name: string
			data: Array<number>
		}>
	}
	participantsCities: {
		labels: Array<string>
		data: Array<number>
	}
	interestedParticipants: number
	birthdayPeople: Array<{
		id: UUID
		name: string
		birthdate: string
		event: {
			finalDate: string
		}
	}>
}
