import { PieChart } from '@/components/Atoms'
import { ChartContainer } from '@/components/Molecules'
import { GenderType, GenderTypeAPI } from '@/constants'

export const GendersChart = () => {
	return (
		<ChartContainer
			headingText="Gênero"
			subheadingText="Distribuição de cadastros por gênero"
		>
			<PieChart
				labels={[
					GenderType[GenderTypeAPI.MALE].label,
					GenderType[GenderTypeAPI.FEMALE].label,
				]}
				series={[50, 30]}
			/>
		</ChartContainer>
	)
}
