import { ReactNode } from 'react'
import { MdOutlineClose } from 'react-icons/md'

type ModalProps = {
	modalId: string
	children: ReactNode
}

export const Modal = ({ modalId, children }: ModalProps) => {
	return (
		<div
			id={modalId}
			className="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
			data-testid="modal"
		>
			<div className="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full md:max-w-xl">
				<div className="pointer-events-auto flex w-full flex-col rounded-xl border bg-white shadow-sm">
					<div className="flex items-center justify-end px-4 py-3">
						<button
							type="button"
							className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
							data-hs-overlay={`#${modalId}`}
						>
							<span className="sr-only">Close</span>
							<MdOutlineClose />
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}
