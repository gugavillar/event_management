import { Header, InformationCard, Spinner, Text } from '@/components/Atoms'
import { DashboardFromAPI } from '@/services/queries/dashboard/dashboard.types'

type DashboardCardsProps = {
	data?: DashboardFromAPI
	isLoading: boolean
}

export const DashboardCards = ({ data, isLoading }: DashboardCardsProps) => {
	return (
		<section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<InformationCard headingText="Participantes">
				<div className="flex h-full items-center justify-end p-4 md:p-5">
					<Header as="h3" className="text-5xl">
						{isLoading ? <Spinner /> : data?.participants}
					</Header>
				</div>
			</InformationCard>
			<InformationCard headingText="Voluntários">
				<div className="flex h-full items-center justify-end p-4 md:p-5">
					<Header as="h3" className="text-5xl">
						{isLoading ? <Spinner /> : data?.volunteers}
					</Header>
				</div>
			</InformationCard>
			<InformationCard headingText="Pagas">
				<div className="flex h-full flex-col items-center justify-end p-4 md:p-5">
					<Text className="text-lg font-semibold">
						<Text as="span" className="text-base font-normal opacity-50">
							Participantes:
						</Text>{' '}
						{isLoading ? <Spinner /> : data?.participantPayment}
					</Text>
					<Text className="text-lg font-semibold">
						<Text as="span" className="text-base font-normal opacity-50">
							Voluntários:
						</Text>{' '}
						{isLoading ? <Spinner /> : data?.volunteerPayment}
					</Text>
				</div>
			</InformationCard>
			<InformationCard headingText="Confirmadas">
				<div className="flex h-full flex-col items-center justify-end p-4 md:p-5">
					<Text className="text-lg font-semibold">
						<Text as="span" className="text-base font-normal opacity-50">
							Participantes:
						</Text>{' '}
						{isLoading ? <Spinner /> : data?.confirmedParticipants}
					</Text>
					<Text className="text-lg font-semibold">
						<Text as="span" className="text-base font-normal opacity-50">
							Voluntários:
						</Text>{' '}
						{isLoading ? <Spinner /> : data?.confirmedVolunteers}
					</Text>
				</div>
			</InformationCard>
		</section>
	)
}
