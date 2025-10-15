import Image from 'next/image'

export const ClosedInscriptions = () => {
	return (
		<div className="relative h-dvh w-dvw">
			<Image
				alt="Encerradas"
				blurDataURL="/subscription-closed.jpg"
				className="object-contain lg:object-cover"
				fill
				placeholder="blur"
				sizes="100vw"
				src="/subscription-closed.jpg"
			/>
		</div>
	)
}
