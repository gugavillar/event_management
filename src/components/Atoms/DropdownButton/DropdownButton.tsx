import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type DropdownButtonProps = ComponentProps<'button'> & {
	children: ReactNode
	buttonLabel: ReactNode
}

export const DropdownButton = ({
	buttonLabel,
	children,
	className,
	...props
}: DropdownButtonProps) => {
	return (
		<div className="hs-dropdown relative inline-flex">
			<button
				id="hs-dropdown-default"
				type="button"
				className={twMerge(
					'hs-dropdown-toggle focus:outline-hidden inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50',
					className,
				)}
				{...props}
			>
				{buttonLabel}
			</button>

			<div
				className="hs-dropdown-menu duration mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100"
				role="menu"
			>
				<div className="space-y-0.5 p-1">{children}</div>
			</div>
		</div>
	)
}
