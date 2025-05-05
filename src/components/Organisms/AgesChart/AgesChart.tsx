import { BarChart, Spinner } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

type AgesChartsProps = {
	categories?: string[]
	series?: number[]
}

export const AgesChart = ({ categories, series }: AgesChartsProps) => {
	const hasData = !!series
	return (
		<ChartContainer
			headingText="Faixa etária"
			subheadingText="Quantitativo de cadastros por faixa etária"
		>
			{hasData ? (
				<BarChart categories={categories} series={[{ data: series }]} />
			) : (
				<div className="flex h-32 items-center justify-center">
					<Spinner className="size-12" />
				</div>
			)}
		</ChartContainer>
	)
}
