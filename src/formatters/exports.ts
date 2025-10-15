import type { $Enums } from '@prisma/client'
import { differenceInYears, format } from 'date-fns'

import { CHECK_IN_STATUS, PaymentType, PaymentTypeAPI, StatusType } from '@/constants'

export const paymentStatus = (
	checkInStatus: $Enums.ParticipantOrVolunteerStatus | null,
	hasPayment: $Enums.PaymentType | null
) => {
	if (checkInStatus === CHECK_IN_STATUS.WITHDREW) {
		return StatusType[CHECK_IN_STATUS.WITHDREW].label
	}

	if (!hasPayment) return PaymentType[PaymentTypeAPI.OPEN].label

	return PaymentType[hasPayment].label
}

export const paymentDate = (hasPayment: $Enums.PaymentType | null, date: Date) => {
	if (!hasPayment) return ''

	return format(date, 'dd/MM/yyyy')
}

export const formatCheckIn = (checkIn: $Enums.ParticipantOrVolunteerStatus | null) => {
	if (!checkIn) return StatusType[CHECK_IN_STATUS.NOT_ANSWERED].label

	return StatusType[checkIn].label
}

export const formatBirthdate = (birthdate: string | Date, eventFinalDate: string | Date, showAge = true) => {
	if (!birthdate || !eventFinalDate) return ''

	if (!showAge) {
		return format(birthdate, 'dd/MM/yyyy')
	}

	return `${format(birthdate, 'dd/MM/yyyy')} - ${differenceInYears(new Date(eventFinalDate), birthdate)} anos`
}
