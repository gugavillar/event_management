import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type RadioProps = ComponentPropsWithoutRef<'input'> & {
	isInvalid?: boolean
	options: Array<{
		label: string
		description?: string
		value: string
	}>
	fieldName: string
	position?: 'column' | 'row'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ options, isInvalid, position = 'column', fieldName, ...props }, ref) => {
		if (!options?.length) return null

		return (
			<div
				className={twMerge(
					'grid gap-2',
					position === 'column' ? 'space-y-3' : 'grid-cols-2',
				)}
				data-testid="radio"
			>
				{options?.map((option) => (
					<div className="relative flex items-center" key={option.value}>
						<div className="flex h-5 items-center">
							<input
								ref={ref}
								type="radio"
								className={twMerge(
									'rounded-full border-gray-200 text-blue-600 focus:ring-blue-500',
									isInvalid &&
										'border-red-500 focus:border-red-500 focus:ring-red-500',
								)}
								value={option.value}
								id={`${fieldName}-${option.value}`}
								{...props}
							/>
						</div>
						<label htmlFor={`${fieldName}-${option.value}`} className="ms-3">
							<span className="block text-sm font-semibold text-gray-800">
								{option.label}
							</span>
							{option.description && (
								<span className="block text-sm text-gray-600">
									{option.description}
								</span>
							)}
						</label>
					</div>
				))}
			</div>
		)
	},
)

Radio.displayName = 'Radio'
