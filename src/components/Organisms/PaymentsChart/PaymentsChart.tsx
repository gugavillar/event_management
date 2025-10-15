import {
	ChartContainer,
	ChartValidation,
	type ChartValidationProps,
} from '@/components/Molecules'

export const PaymentsChart = ({
	categories,
	series,
	isLoading,
}: ChartValidationProps) => {
	return (
		<ChartContainer
			headingText="Pagamentos"
			subheadingText="Quantitativo de pagamentos por tipo"
		>
			<ChartValidation
				categories={categories}
				isLoading={isLoading}
				series={series}
			/>
		</ChartContainer>
	)
}
