import { BarChart, Spinner } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

type PaymentsChartsProps = {
	categories?: string[]
	series?: number[]
}

export const PaymentsChart = ({ categories, series }: PaymentsChartsProps) => {
	const hasData = !!series
	return (
		<ChartContainer
			headingText="Pagamentos"
			subheadingText="Distribuição de pagamentos por tipo"
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
