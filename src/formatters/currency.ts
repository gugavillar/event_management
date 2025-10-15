export const currencyValue = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		style: 'currency',
	}).format(value)
}

export const currencyFieldValue = (value: string) => {
	if (!value || value === '000' || value === '00') return ''

	return new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency',
	}).format(Number(value) / 100)
}

export const removeCurrencyFormat = (value: string) => {
	if (!value) return ''
	const newValue = value.replace(/[R$.\s]/g, '')
	return newValue.replace(/,/g, '.')
}
