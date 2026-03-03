'use client'
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
				<AlertDialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-xs data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out" />
				<AlertDialog.Content
					className={twMerge(
						'fixed left-1/2 w-[92%] md:w-lg top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6',
						isLarge && 'md:w-xl lg:w-6xl'
					)}
				>
					<AlertDialog.Cancel className="absolute cursor-pointer top-3 right-3 flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
						<CircleX size={20} />
					</AlertDialog.Cancel>
					{children}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)

	// return createPortal(
	// 	<div
	// 		className={twMerge(
	// 			'hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-x-hidden overflow-y-auto',
	// 			isStatic && '[--overlay-backdrop:static]'
	// 		)}
	// 		data-testid="modal"
	// 		id={modalId}
	// 	>
	// 		<div
	// 			className={twMerge(
	// 				'hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out sm:mx-auto sm:w-full md:max-w-lg',
	// 				isLarge && 'md:max-w-xl lg:max-w-6xl'
	// 			)}
	// 		>
	// 			<div className="pointer-events-auto relative flex w-full flex-col rounded-xl border bg-white p-6 shadow-sm">
	// 				<button
	// 					className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
	// 					onClick={handleCloseModal}
	// 					type="button"
	// 				>
	// 					<span className="sr-only">Close</span>
	// 					<CircleX size={20} />
	// 				</button>
	// 				{children}
	// 			</div>
	// 		</div>
	// 	</div>,
	// 	document.body
	// )
}
