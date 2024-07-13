export const currencyValue = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value)
}

export const currencyFieldValue = (value: string) => {
	if (!value) return ''
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(Number(value) / 100)
}

export const removeCurrencyFormat = (value: string) => {
	if (!value) return ''
	const newValue = value.replace(/[R$.\s]/g, '')
	return newValue.replace(/,/g, '.')
}
