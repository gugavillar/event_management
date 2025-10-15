import type { ComponentProps, Dispatch, SetStateAction } from 'react'

type SearchBoxOption = ComponentProps<'option'> & {
	customProps: Record<string, string>
}

export type SearchBoxProps<T = string> = Omit<
	ComponentProps<'select'>,
	'value' | 'onChange'
> & {
	search: string
	setSearch: Dispatch<SetStateAction<string>>
	label?: string
	error?: string
	isLoading?: boolean
	selectedValue: T
	setSelectedValue: (value: T) => void
	options?: Array<SearchBoxOption>
	keyOptionValue: string
	keyOptionLabel: string
	lastItemRef?: (node: HTMLLIElement | null) => void
}

export type SearchBoxOptionsProps<T = string> = {
	options: SearchBoxProps<T>['options']
	keyOptionValue: SearchBoxProps<T>['keyOptionValue']
	keyOptionLabel: SearchBoxProps<T>['keyOptionLabel']
	lastItemRef: SearchBoxProps<T>['lastItemRef']
	selectedValue: SearchBoxProps<T>['selectedValue']
	setSelectedValue: SearchBoxProps<T>['setSelectedValue']
	setIsOpen: (value: boolean) => void
}
