import { format, formatISO, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const formatToBrazilianDate = (date: string) => {
	if (!date) return ''
	return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export const formatToISODate = (date: string) => {
	if (!date) return ''
	const startDate = startOfDay(new Date(date))
	return formatISO(startDate)
}
