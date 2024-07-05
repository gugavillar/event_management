import { PieChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'

export const PaymentsChart = () => {
	return (
		<ChartContainer
			headingText="Pagamentos"
			subheadingText="Distribuição de pagamentos por tipo"
		>
			<PieChart
				labels={['Pix', 'Boleto', 'Cartão de Credito']}
				series={[50, 30, 20]}
			/>
		</ChartContainer>
	)
}
