import { Text } from '@/components/Atoms'
import { HeaderPage } from '@/components/Molecules'
import {
	PaymentsChart,
	AgesChart,
	CitiesChart,
	GendersChart,
	DashboardCards,
} from '@/components/Organisms'

export const Dashboard = () => {
	return (
		<>
			<HeaderPage>
				<Text className="opacity-50">
					Selecione um evento e veja as estatísticas abaixo
				</Text>
			</HeaderPage>
			<div className="w-full space-y-8 p-12">
				<DashboardCards />
				<CitiesChart />
				<div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
					<GendersChart />
					<PaymentsChart />
				</div>
				<AgesChart />
			</div>
		</>
	)
}
