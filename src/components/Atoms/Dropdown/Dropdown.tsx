import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type DropdownProps = {
	trigger: ReactNode
	children: ReactNode
}

type DropdownItemProps = {
	children: ReactNode
} & DropdownMenu.DropdownMenuItemProps

export const Dropdown = ({ trigger, children }: DropdownProps) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="bg-white min-w-52 px-1.5 py-2.5 border border-gray-200 rounded-lg shadow-md">
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}

export const DropdownItem = ({ children, className, ...props }: DropdownItemProps) => {
	return (
		<DropdownMenu.Item className={twMerge('text-sm', className)} {...props}>
			{children}
		</DropdownMenu.Item>
	)
}
