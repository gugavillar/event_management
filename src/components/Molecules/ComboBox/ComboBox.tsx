'use client'
import { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

import { Label } from '@/components/Atoms'
import { useClickOutside } from '@/hooks'

import { ComboBoxOptionsProps, ComboBoxProps } from './ComboBox.types'

const ComboBoxOptions = <T,>({
	options,
	keyOptionLabel,
	keyOptionValue,
	lastItemRef,
	selectedValue,
	setSelectedValue,
	setIsOpen,
}: ComboBoxOptionsProps<T>) => {
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

export const ComboBox = <T,>({
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
}: ComboBoxProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)

	const selectLabel =
		options?.find((opt) => opt.customProps[keyOptionValue] === selectedValue)
			?.customProps[keyOptionLabel] ?? ''

	useClickOutside({ isOpen, toggle: () => setIsOpen(false), containerRef })

	return (
		<div className={twMerge('w-full', className)}>
			<Label {...(error && { 'aria-invalid': true })}>{label}</Label>
			<div className="relative w-full" ref={containerRef}>
				<button
					type="button"
					className={twMerge(
						'border-cod-gray-300 focus:ring-midnight-100 inline-flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left shadow-sm focus:ring-2',
						error && 'border-maroon-flush-300 ring-maroon-flush-100',
					)}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isLoading ? 'Carregando...' : selectLabel || 'Selecione uma opção'}
					<FaChevronDown size={12} />
				</button>
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
