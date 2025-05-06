import {
	ChartContainer,
	ChartValidation,
	ChartValidationProps,
} from '@/components/Molecules'

export const CitiesChart = ({
	categories,
	series,
	isLoading,
}: ChartValidationProps) => {
	return (
		<ChartContainer
			headingText="Cidades"
			subheadingText="Quantitativo de participantes por cidade"
		>
			<ChartValidation
				isLoading={isLoading}
				categories={categories}
				series={series}
			/>
		</ChartContainer>
	)
}
