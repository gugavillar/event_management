import { format } from 'date-fns'

import { CHECK_IN_STATUS, PaymentType, PaymentTypeAPI, StatusType } from '@/constants'

import { formatBirthdate, formatCheckIn, paymentDate, paymentStatus } from './exports'

describe('exports formatters', () => {
	it('paymentStatus return "Desistiu" when status is "desistiu"', () => {
		expect(paymentStatus(CHECK_IN_STATUS.WITHDREW, null)).toBe(StatusType[CHECK_IN_STATUS.WITHDREW].label)
	})

	it('paymentStatus return "Em aberto" when status is "confirmed" and has no payment', () => {
		expect(paymentStatus(CHECK_IN_STATUS.CONFIRMED, null)).toBe(PaymentType[PaymentTypeAPI.OPEN].label)
	})

	it('paymentStatus return "Pix" when status is "confirmed" and has payment "pix"', () => {
		expect(paymentStatus(CHECK_IN_STATUS.CONFIRMED, PaymentTypeAPI.PIX)).toBe(PaymentType[PaymentTypeAPI.PIX].label)
	})

	it('paymentDate return empty string when hasNoPayment', () => {
		expect(paymentDate(null, new Date())).toBe('')
	})

	it('paymentDate return formatted date when hasPayment', () => {
		expect(paymentDate(PaymentTypeAPI.PIX, new Date())).toBe(format(new Date(), 'dd/MM/yyyy'))
	})

	it('formatCheckIn return "Sem resposta" when status is null', () => {
		expect(formatCheckIn(null)).toBe(StatusType[CHECK_IN_STATUS.NOT_ANSWERED].label)
	})

	it('formatCheckIn return checkIn label when status is passed', () => {
		expect(formatCheckIn(CHECK_IN_STATUS.CONFIRMED)).toBe(StatusType[CHECK_IN_STATUS.CONFIRMED].label)
	})

	it('formatBirthdate return empty string when no passed values', () => {
		expect(formatBirthdate('', '')).toBe('')
	})

	it('formatBirthdate return formatted date without age when showAge is false', () => {
		expect(formatBirthdate('2000-01-01', '2023-01-01', false)).toBe('01/01/2000')
	})

	it('formatBirthdate return formatted date with age when showAge is true', () => {
		expect(formatBirthdate('2000-01-01', '2023-01-01')).toBe('01/01/2000 - 23 anos')
	})
})
