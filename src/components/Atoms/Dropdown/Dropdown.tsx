'use client'
import { isServer } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { type ReactNode, useEffect } from 'react'

type DropdownProps = {
	label: ReactNode
	children: ReactNode
}

export const Dropdown = ({ children, label }: DropdownProps) => {
	useEffect(() => {
		const load = async () => {
			if (isServer) return

			const { HSDropdown } = await import('preline/preline')
			HSDropdown.autoInit()
		}
		load()
	}, [])

	return (
		<div className="hs-dropdown relative inline-flex">
			<button
				className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-sm font-medium text-gray-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
				id="hs-dropdown-default"
				type="button"
			>
				{label}
				<ChevronDown className="hs-dropdown-open:rotate-180 size-4" />
			</button>

			<div
				className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 z-10 mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:start-0 before:-top-4 before:h-4 before:w-full after:absolute after:start-0 after:-bottom-4 after:h-4 after:w-full"
				role="menu"
			>
				<div className="space-y-0.5 p-4">{children}</div>
			</div>
		</div>
	)
}
