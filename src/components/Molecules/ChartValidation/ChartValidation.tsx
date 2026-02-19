import type { Props } from 'react-apexcharts'

import { BarChart, Spinner } from '@/components/Atoms'

export type ChartValidationProps = {
	categories?: string[]
	series?: Props['series']
	isLoading: boolean
}

export const ChartValidation = ({ categories, series, isLoading }: ChartValidationProps) => {
	if (isLoading) {
		return (
			<div className="flex h-32 items-center justify-center">
				<Spinner className="size-12" />
			</div>
		)
	}

	const hasNoData = !series?.length || series?.some((value) => value === 0)

	if (hasNoData) {
		return (
			<div className="flex h-32 items-center justify-center">
				<p className="text-center">Não existem dados</p>
			</div>
		)
	}

	return <BarChart categories={categories} series={series} />
}
