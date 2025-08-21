'use client'
import { ChevronDown, TriangleAlert } from 'lucide-react'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { HelperErrorText, Label } from '@/components/Atoms'
import { useClickAway } from '@/hooks'

import { ComboBoxOptionsProps, ComboBoxProps } from './ComboBox.types'

const Warning = () => {
	return (
		<div
			className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3"
			data-testid="warning-icon"
		>
			<TriangleAlert className="size-4 shrink-0 text-red-500" />
		</div>
	)
}

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
		<div className="absolute right-0 left-0 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
			<ul>
				{options?.map((opt, index) => {
					const valueOption = opt.customProps[keyOptionValue]
					const labelOption = opt.customProps[keyOptionLabel]

					const refProps =
						index === options?.length - 1 ? { ref: lastItemRef } : {}
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
	placeholder,
}: ComboBoxProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useClickAway(containerRef, () => setIsOpen(false))

	const selectLabel =
		options?.find((opt) => opt.customProps[keyOptionValue] === selectedValue)
			?.customProps[keyOptionLabel] ?? ''

	const placeholderLabel = placeholder ?? 'Selecione uma opção'

	return (
		<div className={twMerge('w-full', className)} ref={containerRef}>
			{label && <Label {...(error && { 'aria-invalid': true })}>{label}</Label>}
			<div className="relative w-full">
				<button
					type="button"
					className={twMerge(
						'inline-flex min-h-12 w-full items-center justify-between rounded-lg border border-gray-500 bg-white px-4 py-3 text-left text-base shadow-sm focus:ring-2 focus:ring-gray-300 focus-visible:outline-none',
						error && 'border-red-500 focus:ring-red-500',
					)}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isLoading ? 'Carregando...' : selectLabel || placeholderLabel}
					{error ? (
						<Warning />
					) : (
						<ChevronDown
							size={14}
							className={twMerge(
								'transition-transform duration-200',
								isOpen && 'rotate-180',
							)}
						/>
					)}
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
			{error ? (
				<HelperErrorText className="text-red-500">{error}</HelperErrorText>
			) : null}
		</div>
	)
}
