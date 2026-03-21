'use client'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import type { FullSchemaType as ParticipantSchemaType } from '@/components/Templates/ExternalParticipantForm/ExternalParticipantForm.schema'
import type { FullSchemaType as VolunteerSchemaType } from '@/components/Templates/ExternalVolunteerForm/ExternalVolunteerForm.schema'

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
	isInterestedList?: boolean
}

export const Step = ({
	steps,
	handleFinish,
	currentStep,
	handleNext,
	handlePrev,
	isPending,
	isInterestedList,
}: StepProps) => {
	const { watch } = useFormContext<ParticipantSchemaType | VolunteerSchemaType>()

	const isPaymentMethodSelected = Boolean(watch('paymentMethod')) && currentStep === 2
	const isInterestedListSuccess = isInterestedList
		? Object.values(watch('address')).every(Boolean) && watch('terms')
		: false
	const isLastStep = currentStep === steps.length - 1
	return (
		<>
			<ul className="relative flex flex-row gap-x-2 overflow-x-auto">
				{steps.map(({ title }, index) => {
					const isLast = index === steps.length - 1
					const isActive = index === currentStep
					const isSuccess = isPaymentMethodSelected || isInterestedListSuccess || currentStep > index
					const isCurrent = currentStep === index
					return (
						<li
							className={twMerge('group flex flex-1 shrink basis-0 items-center gap-x-2', isLast && 'w-fit grow-0')}
							key={title}
						>
							<span
								className={twMerge(
									'group inline-flex min-h-7 min-w-7 items-center align-middle text-xs',
									!isCurrent && !isSuccess && 'opacity-50'
								)}
							>
								<span
									className={twMerge(
										'flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-800 group-focus:bg-gray-200',
										isActive && 'bg-sky-600 text-white',
										isSuccess && 'bg-teal-600 text-white'
									)}
								>
									{!isSuccess ? (
										<span className="block">{index + 1}</span>
									) : (
										<Check className="block size-3 shrink-0" />
									)}
								</span>
								<span className="ms-2 font-medium text-gray-800 text-sm">{title}</span>
							</span>
							<div
								className={twMerge('h-px w-full flex-1 bg-gray-200 group-last:hidden', isSuccess && 'bg-teal-600')}
							/>
						</li>
					)
				})}
			</ul>
			<div className="my-6">{steps[currentStep].content}</div>
			<div className="mt-auto flex flex-col items-center justify-between gap-4 md:flex-row">
				<button
					className="inline-flex w-full cursor-pointer items-center justify-center gap-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-medium text-gray-800 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
					disabled={isPending || currentStep === 0}
					onClick={handlePrev}
					type="button"
				>
					<ChevronLeft className="size-3" />
					Voltar
				</button>
				{!isLastStep && (
					<button
						className="inline-flex w-full cursor-pointer items-center justify-center gap-x-1 rounded-lg border border-transparent bg-teal-500 px-3 py-2.5 font-medium text-sm text-white transition-all duration-300 hover:bg-teal-400 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
						onClick={handleNext}
						type="button"
					>
						Próximo
						<ChevronRight className="size-3" />
					</button>
				)}
				{isLastStep && (
					<Button
						className="inline-flex w-full cursor-pointer items-center justify-center gap-x-1 rounded-lg border border-transparent bg-teal-500 px-3 py-2.5 font-medium text-sm text-white transition-all duration-300 hover:bg-teal-400 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
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
