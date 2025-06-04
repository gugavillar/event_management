'use client'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
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
								'cursor-pointer px-4 py-2 text-base hover:bg-gray-100',
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
			{label && <Label {...(error && { 'aria-invalid': true })}>{label}</Label>}
			<div className="relative w-full" ref={containerRef}>
				<button
					type="button"
					className={twMerge(
						'inline-flex w-full items-center justify-between rounded-lg border border-gray-500 bg-white px-4 py-3 text-left text-base shadow-sm focus:ring-2',
						error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
					)}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isLoading ? 'Carregando...' : selectLabel || 'Selecione uma opção'}
					<ChevronDown size={14} className={isOpen ? 'rotate-180' : ''} />
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
