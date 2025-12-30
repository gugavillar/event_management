import { MicrosoftClarity } from '@/components/Atoms/Metrics'
import { IS_NOT_DEVELOPMENT } from '@/constants'

export default function ExternalLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			{IS_NOT_DEVELOPMENT && <MicrosoftClarity />}
			{children}
		</>
	)
}
