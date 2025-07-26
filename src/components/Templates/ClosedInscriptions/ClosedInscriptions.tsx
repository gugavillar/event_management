import Image from 'next/image'

import { closedImage } from '@/constants'

export const ClosedInscriptions = ({ eventName }: { eventName?: string }) => {
	const image = closedImage(eventName)

	return (
		<div className="relative h-dvh w-dvw">
			<Image
				src={image}
				alt="Encerradas"
				fill
				className="object-contain lg:object-cover"
				priority
				sizes="100vw"
			/>
		</div>
	)
}
