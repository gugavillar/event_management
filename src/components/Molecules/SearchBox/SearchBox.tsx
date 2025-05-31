'use client'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Field, Label } from '@/components/Atoms'
import { useClickOutside } from '@/hooks'

import { SearchBoxOptionsProps, SearchBoxProps } from './SearchBox.types'

const ComboBoxOptions = <T,>({
	options,
	keyOptionLabel,
	keyOptionValue,
	lastItemRef,
	selectedValue,
	setSelectedValue,
	setIsOpen,
}: SearchBoxOptionsProps<T>) => {
	const handleSelectValue = (value: T, isDisabled?: boolean) => {
		if (isDisabled) return

		setSelectedValue(value)
		setIsOpen(false)
	}
	return (
		<div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
			<ul>
				{options?.map((opt, index) => {
					const valueOption = opt.customProps[keyOptionValue]
					const labelOption = opt.customProps[keyOptionLabel]

					const refProps =
						index === options.length - 1 ? { ref: lastItemRef } : {}
					return (
						<li
							key={valueOption}
							className={twMerge(
								'cursor-pointer px-4 py-2 text-sm hover:bg-gray-100',
								selectedValue === valueOption && 'bg-gray-100 font-medium',
								opt.disabled && 'cursor-not-allowed text-gray-400',
							)}
							onClick={() => handleSelectValue(valueOption as T, opt.disabled)}
							{...refProps}
						>
							{labelOption}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export const SearchBox = <T,>({
	className,
	error,
	label,
	selectedValue,
	isLoading,
	options,
	keyOptionLabel,
	keyOptionValue,
	lastItemRef,
	setSelectedValue,
	search,
	setSearch,
	disabled,
}: SearchBoxProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen && inputRef.current) {
			return inputRef.current.focus()
		}
	}, [isOpen])

	const selectLabel =
		options?.find((opt) => opt.customProps[keyOptionValue] === selectedValue)
			?.customProps[keyOptionLabel] ?? ''

	useClickOutside({ isOpen, toggle: () => setIsOpen(false), containerRef })

	return (
		<div className={twMerge('w-full', className)}>
			{label && <Label {...(error && { 'aria-invalid': true })}>{label}</Label>}
			<div className="relative w-full" ref={containerRef}>
				{isOpen ? (
					<Field
						ref={inputRef}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				) : (
					<button
						type="button"
						className={twMerge(
							'inline-flex w-full items-center justify-between rounded-lg border border-gray-500 bg-white px-4 py-3 text-left text-sm shadow-sm focus:ring-2',
							error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
							disabled && 'pointer-events-none opacity-50',
						)}
						onClick={() => setIsOpen((prev) => !prev)}
						disabled={disabled}
					>
						{isLoading ? 'Carregando...' : selectLabel || 'Selecione uma opção'}
						<ChevronDown size={12} />
					</button>
				)}
				{isOpen && (
					<ComboBoxOptions
						options={options}
						keyOptionLabel={keyOptionLabel}
						keyOptionValue={keyOptionValue}
						lastItemRef={lastItemRef}
						selectedValue={selectedValue}
						setSelectedValue={setSelectedValue}
						setIsOpen={setIsOpen}
					/>
				)}
			</div>
		</div>
	)
}
