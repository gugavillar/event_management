import type { ComponentProps } from 'react'

type ComboBoxOption = ComponentProps<'option'> & {
	customProps: Record<string, string>
}

export type ComboBoxProps<T = string> = Omit<ComponentProps<'select'>, 'value' | 'onChange'> & {
	setSelectedValue: (value: T) => void
	keyOptionValue: string
	keyOptionLabel: string
	label?: string
	error?: string
	isLoading?: boolean
	selectedValue?: T
	options?: Array<ComboBoxOption>
	lastItemRef?: (node: HTMLLIElement | null) => void
	placeholder?: string
}

export type ComboBoxOptionsProps<T = string> = {
	options: ComboBoxProps<T>['options']
	keyOptionValue: ComboBoxProps<T>['keyOptionValue']
	keyOptionLabel: ComboBoxProps<T>['keyOptionLabel']
	lastItemRef: ComboBoxProps<T>['lastItemRef']
	selectedValue: ComboBoxProps<T>['selectedValue']
	setSelectedValue: ComboBoxProps<T>['setSelectedValue']
	setIsOpen: (value: boolean) => void
}
