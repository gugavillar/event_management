import { PieChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

export const GendersChart = () => {
	return (
		<ChartContainer
			headingText="Gênero"
			subheadingText="Distribuição de cadastros por gênero"
		>
			<PieChart labels={['Masculino', 'Feminino']} series={[50, 30]} />
		</ChartContainer>
	)
}
