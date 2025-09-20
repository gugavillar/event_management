import { Spinner } from '@/components/Atoms'

export default function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<Spinner className="size-12 text-teal-500" />
		</div>
	)
}
