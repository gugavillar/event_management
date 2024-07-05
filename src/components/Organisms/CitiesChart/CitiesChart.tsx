import { BarChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

export const CitiesChart = () => {
	return (
		<ChartContainer
			headingText="Cidades"
			subheadingText="Quantitativo de cadastros por cidades"
		>
			<BarChart
				categories={['Gravatá', 'Bezerros', 'Caruaru', 'Chã grande']}
				series={[{ data: [50, 30, 10, 25] }]}
			/>
		</ChartContainer>
	)
}
