export const paymentOptionsRadio = (isTotalDisabled: boolean) => [
	{
		description: 'Pagamento do valor total',
		disabled: isTotalDisabled,
		label: 'Total',
		value: 'total',
	},
	{
		description: 'Pagamento de valor parcial',
		disabled: false,
		label: 'Parcial',
		value: 'partial',
	},
]
