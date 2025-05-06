import {
	ChartContainer,
	ChartValidation,
	ChartValidationProps,
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
				isLoading={isLoading}
				categories={categories}
				series={series}
			/>
		</ChartContainer>
	)
}
