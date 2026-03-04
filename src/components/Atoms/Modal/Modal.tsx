import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { CircleX } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ModalProps = {
	open: boolean
	onOpenChange: VoidFunction
	children: ReactNode
	isLarge?: boolean
}

export const Modal = ({ children, isLarge, open, onOpenChange }: ModalProps) => {
	return (
		<AlertDialog.Root onOpenChange={onOpenChange} open={open}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-xs data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
				<AlertDialog.Content
					className={twMerge(
						'fixed top-1/2 left-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 md:w-lg',
						isLarge && 'md:w-xl lg:w-6xl',
						'data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in'
					)}
				>
					<AlertDialog.Title className="sr-only">Modal</AlertDialog.Title>
					<AlertDialog.Cancel className="absolute top-3 right-3 flex size-7 cursor-pointer items-center justify-center rounded-full border border-transparent font-semibold text-gray-800 text-sm hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
						<CircleX size={20} />
					</AlertDialog.Cancel>
					{children}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}
