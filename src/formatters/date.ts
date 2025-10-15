import {
	differenceInYears,
	format,
	isBefore,
	isEqual,
	isPast,
	isValid,
	parse,
	startOfDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

const getNumberDate = (date: string, formatString = 'yyyy-MM-dd') => {
	if (!date) return NaN

	return startOfDay(
		parse(date, formatString, new Date(), {
			locale: ptBR,
		}).getTime()
	)
}

export const formatToBrazilianDate = (date: string) => {
	if (!date) return ''

	return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export const isValidateDate = (date: string) => {
	if (!date) return false

	const numberedDate = getNumberDate(date, 'dd/MM/yyyy')

	return isValid(numberedDate)
}

export const isEqualOrIsBeforeFirstDate = (
	firstDate: string,
	finalDate: string
) => {
	if (!firstDate || !finalDate) return false

	const numberedFirstData = getNumberDate(firstDate, 'dd/MM/yyyy')
	const numberedFinalDate = getNumberDate(finalDate, 'dd/MM/yyyy')

	return (
		isBefore(numberedFirstData, numberedFinalDate) ||
		isEqual(numberedFirstData, numberedFinalDate)
	)
}

export const formatDateToSendToApi = (date: string) => {
	if (!date) return ''

	return parse(date, 'dd/MM/yyyy', new Date(), {
		locale: ptBR,
	}).toISOString()
}

export const validateBirthdate = (date: string) => {
	if (!date) return false

	const numberedDate = getNumberDate(date, 'dd/MM/yyyy')

	return isValid(numberedDate) && isPast(numberedDate)
}

export const validateDateRange = (
	date: string,
	initialRange?: number | null,
	finalRange?: number | null
) => {
	if (!initialRange) return true

	if (!date) return false

	const numberedDate = getNumberDate(date, 'dd/MM/yyyy')
	const age = differenceInYears(new Date(), new Date(numberedDate))

	return finalRange
		? age >= initialRange && age <= finalRange
		: age >= initialRange
}
