import {
	ChartContainer,
	ChartValidation,
	type ChartValidationProps,
} from '@/components/Molecules'

export const AgesChart = ({
	categories,
	series,
	isLoading,
}: ChartValidationProps) => {
	return (
		<ChartContainer
			headingText="Faixa etária"
			subheadingText="Quantitativo por faixa etária"
		>
			<ChartValidation
				categories={categories}
				isLoading={isLoading}
				series={series}
			/>
		</ChartContainer>
	)
}
