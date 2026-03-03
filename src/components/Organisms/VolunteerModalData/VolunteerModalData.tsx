import { type Dispatch, memo, type SetStateAction } from 'react'

import { Header, Modal, Spinner } from '@/components/Atoms'
import type { SelectedVolunteer } from '@/components/Templates'
import { VOLUNTEER_MODAL_TYPE } from '@/constants'
import { useGetVolunteer } from '@/services/queries/volunteers'
import type { VolunteersAPI } from '@/services/queries/volunteers/volunteers.type'

import { AddressInfoCard } from '../AddressInfoCard'
import { FamilyContactInfo } from '../FamilyContactInfo'
import { PersonalInfoCard } from '../PersonalInfoCard'

type VolunteerModalDataProps = {
	selectedVolunteer: SelectedVolunteer | null
	setSelectedVolunteer: Dispatch<SetStateAction<SelectedVolunteer | null>>
}

export const VolunteerModalData = memo(({ selectedVolunteer, setSelectedVolunteer }: VolunteerModalDataProps) => {
	const { data, isLoading } = useGetVolunteer(selectedVolunteer?.id as VolunteersAPI['id'])

	const handleClose = () => {
		setSelectedVolunteer(null)
	}

	return (
		<Modal isLarge onOpenChange={handleClose} open={selectedVolunteer?.modal === VOLUNTEER_MODAL_TYPE.INFO}>
			<div className="flex flex-col space-y-4 max-md:h-[85dvh] max-md:overflow-y-auto">
				<Header as="h3" className="text-center">
					Dados do voluntário
				</Header>
				{isLoading || !data ? (
					<div className="flex h-40 items-center justify-center">
						<Spinner />
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
						<PersonalInfoCard type="volunteer" userInfo={{ ...data }} />
						<AddressInfoCard
							addressInfo={{
								...data.address,
							}}
						/>
						<FamilyContactInfo responsibleInfo={{ ...data }} type="volunteer" />
					</div>
				)}
			</div>
		</Modal>
	)
})

VolunteerModalData.displayName = 'VolunteerModalData'
