import { BarChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

export const AgesChart = () => {
	return (
		<ChartContainer
			headingText="Faixa etária"
			subheadingText="Quantitativo de cadastros por faixa etária"
		>
			<BarChart
				categories={[
					'0 a 4 anos',
					'5 a 9 anos',
					'10 a 14 anos',
					'15 anos ou mais',
				]}
				series={[{ data: [50, 30, 10, 25] }]}
			/>
		</ChartContainer>
	)
}
