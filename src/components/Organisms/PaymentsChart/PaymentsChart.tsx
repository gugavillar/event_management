import { PieChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'
import { PaymentType, PaymentTypeAPI } from '@/constants'

export const PaymentsChart = () => {
	return (
		<ChartContainer
			headingText="Pagamentos"
			subheadingText="Distribuição de pagamentos por tipo"
		>
			<PieChart
				labels={[
					PaymentType[PaymentTypeAPI.CARD].label,
					PaymentType[PaymentTypeAPI.CASH].label,
					PaymentType[PaymentTypeAPI.PIX].label,
					PaymentType[PaymentTypeAPI.DONATION].label,
				]}
				series={[50, 30, 5, 7]}
			/>
		</ChartContainer>
	)
}
