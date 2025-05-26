import { ReactNode } from 'react'
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

type StepProps = {
	steps: Array<{
		title: string
		content: ReactNode
	}>
	finalContent: ReactNode
	handleFinish: VoidFunction
}

export const Step = ({ steps, handleFinish, finalContent }: StepProps) => {
	return (
		<>
			<ul className="relative flex flex-row gap-x-2 overflow-x-auto">
				{steps.map(({ title }, index) => {
					const navItem = `{"index": ${index + 1}}`
					const isLast = index === steps.length - 1
					return (
						<li
							key={title}
							className={twMerge(
								'group flex flex-1 shrink basis-0 items-center gap-x-2',
								isLast && 'w-fit flex-grow-0',
							)}
							data-hs-stepper-nav-item={navItem}
						>
							<span className="group inline-flex min-h-7 min-w-7 items-center align-middle text-xs">
								<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-800 group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
									<span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
										{index + 1}
									</span>
									<FaCheck className="hidden size-3 shrink-0 hs-stepper-success:block" />
								</span>
								<span className="ms-2 text-sm font-medium text-gray-800">
									{title}
								</span>
							</span>
							<div className="h-px w-full flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600" />
						</li>
					)
				})}
			</ul>
			<div className="my-6">
				{steps.map(({ content, title }, index) => {
					const navItem = `{"index": ${index + 1}}`
					return (
						<div
							key={title}
							data-hs-stepper-content-item={navItem}
							{...(index > 0 && { style: { display: 'none' } })}
						>
							{content}
						</div>
					)
				})}
				<div
					data-hs-stepper-content-item='{
      			"isFinal": true
    			}'
					style={{ display: 'none' }}
				>
					{finalContent}
				</div>
			</div>
			<div className="mt-auto flex items-center justify-between gap-x-2">
				<button
					type="button"
					className="focus:outline-hidden inline-flex items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
					data-hs-stepper-back-btn
				>
					<FaChevronLeft className="size-3" />
					Voltar
				</button>
				<button
					type="button"
					className="focus:outline-hidden inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
					data-hs-stepper-next-btn
				>
					Próximo
					<FaChevronRight className="size-3" />
				</button>
				<button
					type="button"
					className="focus:outline-hidden inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
					data-hs-stepper-finish-btn
					onClick={handleFinish}
					style={{ display: 'none' }}
				>
					Finalizar
				</button>
			</div>
		</>
	)
}
