import { PieChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

export const ConfirmationsChart = () => {
	return (
		<ChartContainer
			headingText="Confirmação"
			subheadingText="Distribuição de cadastros por confirmação"
		>
			<PieChart labels={['Confirmados', 'Não confirmados']} series={[50, 30]} />
		</ChartContainer>
	)
}
