import { InformationCard } from '@/components/Molecules'

export const DashboardCards = () => {
	return (
		<section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<InformationCard headingText="Participantes" subheadingText="50" />
			<InformationCard headingText="Voluntários" subheadingText="40" />
			<InformationCard headingText="Pagos" subheadingText="10" />
			<InformationCard headingText="Confirmados" subheadingText="5" />
		</section>
	)
}
