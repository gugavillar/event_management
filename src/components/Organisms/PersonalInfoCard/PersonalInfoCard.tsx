import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { InformationCard, Text } from '@/components/Atoms'
import { InfoBox } from '@/components/Molecules'

type PersonalInfoCardProps = ComponentProps<'div'> & {
	userInfo: {
		name: string
		email: string
		called: string
		birthdate: string
		phone: string
		cell?: string
		community?: string
		religion?: string
		health?: string
		pictureUrl?: string
	}
	type: 'volunteer' | 'participant'
}

export const PersonalInfoCard = ({ className, userInfo, type, ...props }: PersonalInfoCardProps) => {
	return (
		<InformationCard className={twMerge('space-y-3 pb-6', className)} headingText="Dados pessoais" {...props}>
			<InfoBox label="Nome" value={userInfo.name} />
			<InfoBox label="Email" value={userInfo.email} />
			<InfoBox label="Como quer ser chamado" value={userInfo.called} />
			<InfoBox label="Data de nascimento" value={userInfo.birthdate} />
			<InfoBox isPhone label="Telefone" value={userInfo.phone} />
			{type === 'participant' ? (
				<InfoBox label="Religião" value={userInfo?.religion ?? 'Não possui'} />
			) : (
				<>
					<InfoBox label="Célula" value={userInfo?.cell ?? 'Não frequenta'} />
					<InfoBox label="Comunidade" value={userInfo?.community} />
				</>
			)}
			<InfoBox label="Restrição Saúde/Alimentar" value={userInfo?.health ?? 'Não possui'} />
			{userInfo?.pictureUrl && (
				<div className="space-y-0.5 px-6">
					<Text className="opacity-50">Foto</Text>
					<Link className="flex items-center gap-2.5 text-sky-500" href={userInfo?.pictureUrl ?? ''} target="_blank">
						Visualizar <ExternalLink size={20} />
					</Link>
				</div>
			)}
		</InformationCard>
	)
}
