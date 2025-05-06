import {
	ChartContainer,
	ChartValidation,
	ChartValidationProps,
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
				isLoading={isLoading}
				categories={categories}
				series={series}
			/>
		</ChartContainer>
	)
}
