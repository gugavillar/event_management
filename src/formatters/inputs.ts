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
