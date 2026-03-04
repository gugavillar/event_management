import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { CircleX } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header } from '../Header'

type DrawerProps = ComponentProps<'div'> & {
	children: ReactNode
	headingTitle: string
	handleClose: VoidFunction
	isOpen: boolean
}

export const Drawer = ({ children, headingTitle, handleClose, className, isOpen }: DrawerProps) => {
	return (
		<AlertDialog.Root onOpenChange={handleClose} open={isOpen}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-xs data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
				<AlertDialog.Content
					className={twMerge(
						'fixed inset-e-0 top-0 z-80 size-full max-w-lg translate-x-full border-s bg-white transition-all duration-300',
						className,
						isOpen ? 'translate-x-0' : 'translate-x-full',
						'data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in'
					)}
				>
					<div className="flex items-center justify-between border-b p-4">
						<AlertDialog.Title asChild>
							<Header as="h3">{headingTitle}</Header>
						</AlertDialog.Title>
						<AlertDialog.Cancel className="absolute top-4 right-3 flex size-7 cursor-pointer items-center justify-center rounded-full border border-transparent font-semibold text-gray-800 text-sm hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
							<CircleX size={20} />
						</AlertDialog.Cancel>
					</div>
					{children}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}
