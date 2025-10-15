import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type AddressInfoCardProps = ComponentProps<'div'> & {
	addressInfo: {
		street: string
		neighborhood: string
		number: string
		city: string
		state: string
	}
}

export const AddressInfoCard = ({ className, addressInfo, ...props }: AddressInfoCardProps) => {
	return (
		<InformationCard className={twMerge('space-y-3 pb-6', className)} headingText="Endereço" {...props}>
			<InfoBox label="Endereço" value={addressInfo.street} />
			<InfoBox label="Bairro" value={addressInfo.neighborhood} />
			<InfoBox label="Número" value={addressInfo.number} />
			<InfoBox label="Cidade" value={addressInfo.city} />
			<InfoBox label="Estado" value={addressInfo.state} />
		</InformationCard>
	)
}
