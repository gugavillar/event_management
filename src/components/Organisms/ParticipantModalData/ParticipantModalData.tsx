import { type Dispatch, memo, type SetStateAction } from 'react'

import { Header, Modal, Spinner } from '@/components/Atoms'
import type { SelectedParticipant } from '@/components/Templates'
import { PARTICIPANT_MODAL_TYPE } from '@/constants'
import { useGetParticipant, useGetPictureUrl } from '@/services/queries/participants'
import type { ParticipantsAPI } from '@/services/queries/participants/participants.type'

import { AddressInfoCard } from '../AddressInfoCard'
import { FamilyContactInfo } from '../FamilyContactInfo'
import { PersonalInfoCard } from '../PersonalInfoCard'

type ParticipantModalDataProps = {
	selectedParticipant: SelectedParticipant | null
	setSelectedParticipant: Dispatch<SetStateAction<SelectedParticipant | null>>
}

export const ParticipantModalData = memo(
	({ selectedParticipant, setSelectedParticipant }: ParticipantModalDataProps) => {
		const { data, isLoading } = useGetParticipant(selectedParticipant?.id as ParticipantsAPI['id'])
		const { getUrl, isPending } = useGetPictureUrl()

		const handleClose = () => {
			setSelectedParticipant(null)
		}

		const handleSeePicture = async () => {
			if (!data?.pictureUrl) return
			const newTab = window.open('', '_blank')
			const response = await getUrl(data?.id)
			if (newTab) {
				newTab.location.href = response.url
			}
		}

		return (
			<Modal isLarge onOpenChange={handleClose} open={selectedParticipant?.modal === PARTICIPANT_MODAL_TYPE.INFO}>
				<div className="flex flex-col space-y-4 max-lg:h-[85dvh] max-lg:overflow-y-auto">
					<Header as="h3" className="text-center">
						Dados do participante
					</Header>
					{isLoading || !data ? (
						<div className="flex h-40 items-center justify-center">
							<Spinner />
						</div>
					) : (
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
							<PersonalInfoCard
								isLoadingUrl={isPending}
								seePicture={handleSeePicture}
								type="participant"
								userInfo={{ ...data }}
							/>
							<AddressInfoCard
								addressInfo={{
									...data.address,
								}}
							/>
							<FamilyContactInfo responsibleInfo={{ ...data }} type="participant" />
						</div>
					)}
				</div>
			</Modal>
		)
	}
)

ParticipantModalData.displayName = 'ParticipantModalData'
