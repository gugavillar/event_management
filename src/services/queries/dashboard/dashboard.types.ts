import { ageRanges } from '@/constants'

export type DashboardFromAPI = {
	participants: number
	volunteers: number
	confirmedParticipants: number
	confirmedVolunteers: number
	participantPayment: number
	volunteerPayment: number
	paymentsTypes: {
		labels: Array<string>
		data: Array<number>
	}
	ageRanges: typeof ageRanges
}
