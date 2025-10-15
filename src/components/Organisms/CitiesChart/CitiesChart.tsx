import { ChartContainer, ChartValidation, type ChartValidationProps } from '@/components/Molecules'

export const CitiesChart = ({ categories, series, isLoading }: ChartValidationProps) => {
	return (
		<ChartContainer headingText="Cidades" subheadingText="Quantitativo de participantes por cidade">
			<ChartValidation categories={categories} isLoading={isLoading} series={series} />
		</ChartContainer>
	)
}
