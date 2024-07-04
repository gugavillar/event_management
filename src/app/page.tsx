import { LoginSvg } from '@/components/Atoms'

export default function Home() {
	return (
		<section className="flex h-full w-full items-center justify-center gap-x-8 md:grid md:grid-cols-appMd lg:grid-cols-appLg">
			<LoginSvg className="hidden h-full w-full md:block" />
			<aside className="flex h-screen w-full items-center justify-center p-6 md:p-8 lg:p-12">
				<button className="w-full bg-blue-400">login</button>
			</aside>
		</section>
	)
}
