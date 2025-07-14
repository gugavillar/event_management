export const paymentOptionsRadio = (isTotalDisabled: boolean) => [
	{
		label: 'Total',
		description: 'Pagamento do valor total',
		value: 'total',
		disabled: isTotalDisabled,
	},
	{
		label: 'Parcial',
		description: 'Pagamento de valor parcial',
		value: 'partial',
		disabled: false,
	},
]
