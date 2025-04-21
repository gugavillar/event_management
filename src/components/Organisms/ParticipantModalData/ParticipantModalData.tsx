import { Dispatch, SetStateAction } from 'react'

import { Header, Modal, Spinner } from '@/components/Atoms'
import { useGetParticipant } from '@/services/queries/participants'
import { ParticipantsFromAPI } from '@/services/queries/participants/participants.type'

import { AddressInfoCard } from '../AddressInfoCard'
import { FamilyContactInfo } from '../FamilyContactInfo'
import { PersonalInfoCard } from '../PersonalInfoCard'

type ParticipantModalDataProps = {
	modalId: string
	selectedParticipant: ParticipantsFromAPI['id'] | null
	setSelectedParticipant: Dispatch<
		SetStateAction<ParticipantsFromAPI['id'] | null>
	>
}

export const ParticipantModalData = ({
	modalId,
	setSelectedParticipant,
	selectedParticipant,
}: ParticipantModalDataProps) => {
	const { data, isLoading } = useGetParticipant(selectedParticipant)
	return (
		<Modal
			modalId={modalId}
			handleClose={() => setSelectedParticipant(null)}
			isLarge
		>
			<div className="flex flex-col space-y-4">
				<Header as="h3" className="text-center">
					Dados do participante
				</Header>
				{isLoading || !data ? (
					<div className="flex h-40 items-center justify-center">
						<Spinner />
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
						<PersonalInfoCard userInfo={{ ...data }} />
						<AddressInfoCard
							addressInfo={{
								...data.Address,
							}}
						/>
						<FamilyContactInfo responsibleInfo={{ ...data }} />
					</div>
				)}
			</div>
		</Modal>
	)
}
