'use client'
import { CircleX } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

type ModalProps = {
	modalId: string
	children: ReactNode
	handleClose?: () => void
	isLarge?: boolean
}

export const Modal = ({
	modalId,
	children,
	handleClose,
	isLarge,
}: ModalProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])

	if (!isMounted) return null

	return createPortal(
		<div
			id={modalId}
			className="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden pb-12"
			data-testid="modal"
		>
			<div
				className={twMerge(
					'm-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full md:max-w-md',
					isLarge && 'md:max-w-xl lg:max-w-6xl',
				)}
			>
				<div className="pointer-events-auto relative flex w-full flex-col rounded-xl border bg-white p-6 shadow-sm">
					<button
						type="button"
						className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
						data-hs-overlay={`#${modalId}`}
						onClick={handleClose}
					>
						<span className="sr-only">Close</span>
						<CircleX size={20} />
					</button>
					{children}
				</div>
			</div>
		</div>,
		document.body,
	)
}
