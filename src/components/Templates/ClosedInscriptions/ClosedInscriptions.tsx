import Image from 'next/image'

export const ClosedInscriptions = () => {
	return (
		<div className="relative h-dvh w-dvw">
			<Image
				src="/subscription-closed.jpg"
				alt="Encerradas"
				fill
				placeholder="blur"
				blurDataURL="/subscription-closed.jpg"
				className="object-contain lg:object-cover"
				sizes="100vw"
			/>
		</div>
	)
}
