import { Select } from '@/components/Atoms'
import {
	PaymentsChart,
	AgesChart,
	CitiesChart,
	GendersChart,
	DashboardCards,
	PageContent,
} from '@/components/Organisms'

export const Dashboard = () => {
	return (
		<PageContent subheadingPage="Selecione um evento e veja as estatísticas abaixo">
			<Select
				placeholder="Selecione o evento"
				className="max-w-sm"
				options={[
					{ label: 'Evento 1', value: '1' },
					{ label: 'Evento 2', value: '2' },
				]}
			/>
			<DashboardCards />
			<CitiesChart />
			<div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
				<GendersChart />
				<PaymentsChart />
			</div>
			<AgesChart />
		</PageContent>
	)
}
