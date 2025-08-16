import { Dispatch, memo, SetStateAction } from 'react'

import { Header, Modal, Spinner } from '@/components/Atoms'
import { useGetParticipant } from '@/services/queries/participants'
import { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { AddressInfoCard } from '../AddressInfoCard'
import { FamilyContactInfo } from '../FamilyContactInfo'
import { PersonalInfoCard } from '../PersonalInfoCard'

type ParticipantModalDataProps = {
	modalId: string
	selectedParticipant: ParticipantsAPI['id'] | null
	setSelectedParticipant: Dispatch<SetStateAction<ParticipantsAPI['id'] | null>>
}

export const ParticipantModalData = memo(
	({
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
				<div className="flex flex-col space-y-4 max-md:h-[85dvh] max-md:overflow-y-auto">
					<Header as="h3" className="text-center">
						Dados do participante
					</Header>
					{isLoading || !data ? (
						<div className="flex h-40 items-center justify-center">
							<Spinner />
						</div>
					) : (
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
							<PersonalInfoCard userInfo={{ ...data }} type="participant" />
							<AddressInfoCard
								addressInfo={{
									...data.address,
								}}
							/>
							<FamilyContactInfo
								responsibleInfo={{ ...data }}
								type="participant"
							/>
						</div>
					)}
				</div>
			</Modal>
		)
	},
)

ParticipantModalData.displayName = 'ParticipantModalData'
