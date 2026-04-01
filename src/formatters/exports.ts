import { differenceInYears, format, parseISO } from 'date-fns'

import { CHECK_IN_STATUS, PaymentType, PaymentTypeAPI, StatusType } from '@/constants'

import { getNumberDate } from './date'

export const paymentStatus = (
	checkInStatus: keyof typeof CHECK_IN_STATUS | null,
	hasPayment: keyof typeof PaymentTypeAPI | null
) => {
	if (checkInStatus === CHECK_IN_STATUS.WITHDREW) {
		return StatusType[CHECK_IN_STATUS.WITHDREW].label
	}

	if (!hasPayment) return PaymentType[PaymentTypeAPI.OPEN].label

	return PaymentType[hasPayment].label
}

export const paymentDate = (hasPayment: keyof typeof PaymentTypeAPI | null, date: Date) => {
	if (!hasPayment) return ''

	return format(date, 'dd/MM/yyyy')
}

export const formatCheckIn = (checkIn: keyof typeof CHECK_IN_STATUS | null) => {
	if (!checkIn) return StatusType[CHECK_IN_STATUS.NOT_ANSWERED].label

	return StatusType[checkIn].label
}

export const formatBirthdate = (birthdate: string, eventFinalDate: string, showAge = true) => {
	if (!birthdate || !eventFinalDate) return ''

	const birth = getNumberDate(birthdate)
	const eventDate = getNumberDate(eventFinalDate)

	if (!showAge) {
		return format(birth, 'dd/MM/yyyy')
	}

	return `${format(birth, 'dd/MM/yyyy')} - ${differenceInYears(new Date(eventDate), birth)} anos`
}
