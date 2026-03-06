import NextImage from 'next/image'

type ImageProps = {
	backgroundImage: string
}

export const Image = ({ backgroundImage }: ImageProps) => {
	return (
		<div className="relative size-full h-[50dvh] lg:h-dvh">
			<NextImage
				alt="Background image"
				blurDataURL="/placeholder.png"
				className="object-cover object-center"
				fill
				placeholder="blur"
				sizes="100vw"
				src={backgroundImage}
			/>
		</div>
	)
}
