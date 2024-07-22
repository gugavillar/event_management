import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type RadioProps = ComponentPropsWithoutRef<'input'> & {
	isInvalid?: boolean
	options: Array<{
		label: string
		description: string
		value: string
	}>
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ options, isInvalid, ...props }, ref) => {
		if (!options?.length) return null

		return (
			<div className="grid space-y-3" data-testid="radio">
				{options?.map((option) => (
					<div className="relative flex items-start" key={option.value}>
						<div className="mt-1 flex h-5 items-center">
							<input
								ref={ref}
								type="radio"
								className={twMerge(
									'rounded-full border-gray-200 text-blue-600 focus:ring-blue-500',
									isInvalid &&
										'border-red-500 focus:border-red-500 focus:ring-red-500',
								)}
								value={option.value}
								id={option.value}
								{...props}
							/>
						</div>
						<label htmlFor={option.value} className="ms-3">
							<span className="block text-sm font-semibold text-gray-800">
								{option.label}
							</span>
							<span className="block text-sm text-gray-600">
								{option.description}
							</span>
						</label>
					</div>
				))}
			</div>
		)
	},
)

Radio.displayName = 'Radio'
