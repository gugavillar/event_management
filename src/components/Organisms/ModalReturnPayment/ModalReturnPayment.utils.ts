export const paymentOptionsRadio = (isTotalDisabled: boolean) => [
	{
		label: 'Total',
		description: 'Devolução do valor total',
		value: 'total',
		disabled: isTotalDisabled,
	},
	{
		label: 'Parcial',
		description: 'Devolução do valor parcial',
		value: 'partial',
		disabled: false,
	},
]
