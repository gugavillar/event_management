export const formatterFieldSelectValues = (
	value?: Array<any>,
	keyLabel?: string,
	keyValue?: string,
) =>
	!value
		? []
		: value?.map((value) => ({
				value: keyValue ? value[keyValue] : value,
				label: keyLabel ? value[keyLabel] : value,
			}))

export const formatterComboBoxValues = (
	value?: Array<any>,
	keyLabel?: string,
	keyValue?: string,
	hasAllOption?: boolean,
) => {
	if (!value) return []

	const formattedValues = value?.map((value) => ({
		customProps: {
			value: keyValue ? value[keyValue] : value,
			label: keyLabel ? value[keyLabel] : value,
		},
	}))

	if (hasAllOption) {
		formattedValues.unshift({ customProps: { value: '', label: 'Todos' } })
	}
	return formattedValues
}
