import { Header, InformationCard, Text } from '@/components/Atoms'

export const DashboardCards = () => {
	return (
		<section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<InformationCard headingText="Participantes">
				<div className="p-4 md:p-5">
					<Header as="h3" className="text-5xl">
						50
					</Header>
				</div>
			</InformationCard>
			<InformationCard headingText="Voluntários">
				<div className="p-4 md:p-5">
					<Header as="h3" className="text-5xl">
						40
					</Header>
				</div>
			</InformationCard>
			<InformationCard headingText="Inscrições pagas">
				<div className="p-4 md:p-5">
					<Header as="h3" className="text-5xl">
						10
					</Header>
				</div>
			</InformationCard>
			<InformationCard headingText="Inscrições confirmadas">
				<div className="p-4 md:p-5">
					<Text className="text-lg">
						<Text as="span" className="text-base opacity-50">
							Participantes:
						</Text>{' '}
						20
					</Text>
					<Text className="text-lg">
						<Text as="span" className="text-base opacity-50">
							Voluntários:
						</Text>{' '}
						10
					</Text>
				</div>
			</InformationCard>
		</section>
	)
}
