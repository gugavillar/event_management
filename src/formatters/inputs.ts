export const formatterFieldSelectValues = (
	value?: Array<any>,
	keyLabel?: string,
	keyValue?: string,
) => {
	if (!value) return []

	return value?.map((value) => ({
		value: keyValue ? value[keyValue] : value,
		label: keyLabel ? value[keyLabel] : value,
	}))
}

export const formatterComboBoxValues = (
	value?: Array<any>,
	keyLabel?: string,
	keyValue?: string,
	hasAllOption?: boolean,
	allOptionsLabel?: string,
) => {
	if (!value) return []

	const formattedValues = value?.map((value) => ({
		customProps: {
			value: keyValue ? value[keyValue] : value,
			label: keyLabel ? value[keyLabel] : value,
		},
	}))

	if (hasAllOption) {
		const label = allOptionsLabel ?? 'Todos'
		formattedValues.unshift({
			customProps: { value: '', label },
		})
	}
	return formattedValues
}

export const convertToBoolean = (value: string | null) => {
	if (!value) return false
	return value === 'true'
}
