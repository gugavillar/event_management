'use client'
import { CircleX } from 'lucide-react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

import { overlayClose } from '@/constants'

type ModalProps = {
	modalId: string
	children: ReactNode
	handleClose?: () => void
	isLarge?: boolean
	isStatic?: boolean
}

export const Modal = ({ modalId, children, handleClose, isLarge, isStatic }: ModalProps) => {
	const handleCloseModal = () => {
		overlayClose(modalId)
		handleClose?.()
	}

	return createPortal(
		<div
			className={twMerge(
				'hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-x-hidden overflow-y-auto',
				isStatic && '[--overlay-backdrop:static]'
			)}
			data-testid="modal"
			id={modalId}
		>
			<div
				className={twMerge(
					'hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out sm:mx-auto sm:w-full md:max-w-lg',
					isLarge && 'md:max-w-xl lg:max-w-6xl'
				)}
			>
				<div className="pointer-events-auto relative flex w-full flex-col rounded-xl border bg-white p-6 shadow-sm">
					<button
						className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
						onClick={handleCloseModal}
						type="button"
					>
						<span className="sr-only">Close</span>
						<CircleX size={20} />
					</button>
					{children}
				</div>
			</div>
		</div>,
		document.body
	)
}
