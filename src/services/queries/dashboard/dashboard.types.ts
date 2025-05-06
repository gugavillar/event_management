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
	ageRanges: {
		labels: Array<string>
		data: Array<number>
	}
	participantsCities: {
		labels: Array<string>
		data: Array<number>
	}
}
