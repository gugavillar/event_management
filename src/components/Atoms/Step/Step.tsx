import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../Button'

type StepProps = {
	currentStep: number
	steps: Array<{
		title: string
		content: ReactNode
	}>
	handleNext: VoidFunction
	handlePrev: VoidFunction
	handleFinish: VoidFunction
	isPending: boolean
}

export const Step = ({
	steps,
	handleFinish,
	currentStep,
	handleNext,
	handlePrev,
	isPending,
}: StepProps) => {
	const isLastStep = currentStep === steps.length - 1
	return (
		<>
			<ul className="relative flex flex-row gap-x-2 overflow-x-auto">
				{steps.map(({ title }, index) => {
					const isLast = index === steps.length - 1
					const isActive = index === currentStep
					const isSuccess = currentStep > index
					return (
						<li
							className={twMerge(
								'group flex flex-1 shrink basis-0 items-center gap-x-2',
								isLast && 'w-fit flex-grow-0'
							)}
							key={title}
						>
							<span className="group inline-flex min-h-7 min-w-7 items-center align-middle text-xs">
								<span
									className={twMerge(
										'flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-800 group-focus:bg-gray-200',
										(isActive || isSuccess) && 'bg-blue-600 text-white'
									)}
								>
									{currentStep === index || !isSuccess ? (
										<span className="block">{index + 1}</span>
									) : (
										<Check className="block size-3 shrink-0" />
									)}
								</span>
								<span className="ms-2 text-sm font-medium text-gray-800">
									{title}
								</span>
							</span>
							<div
								className={twMerge(
									'h-px w-full flex-1 bg-gray-200 group-last:hidden',
									isSuccess && 'bg-blue-600'
								)}
							/>
						</li>
					)
				})}
			</ul>
			<div className="my-6">{steps[currentStep].content}</div>
			<div className="mt-auto flex items-center justify-between gap-x-2">
				<button
					className="inline-flex items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
					disabled={isPending}
					onClick={handlePrev}
					type="button"
				>
					<ChevronLeft className="size-3" />
					Voltar
				</button>
				{!isLastStep && (
					<button
						className="inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
						onClick={handleNext}
						type="button"
					>
						Próximo
						<ChevronRight className="size-3" />
					</button>
				)}
				{isLastStep && (
					<Button
						className="inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
						isLoading={isPending}
						onClick={handleFinish}
						type="button"
					>
						Finalizar
					</Button>
				)}
			</div>
		</>
	)
}
