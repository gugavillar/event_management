import { ComponentProps } from 'react'

type ComboBoxOption = ComponentProps<'option'> & {
	customProps: Record<string, string>
}

export type ComboBoxProps<T = string> = Omit<
	ComponentProps<'select'>,
	'value' | 'onChange'
> & {
	label?: string
	error?: string
	isLoading?: boolean
	selectedValue?: T
	setSelectedValue: (value: T) => void
	options?: Array<ComboBoxOption>
	keyOptionValue: string
	keyOptionLabel: string
	lastItemRef?: (node: HTMLLIElement | null) => void
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
