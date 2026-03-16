import { useMutation } from '@/providers/QueryProvider'

import { getUrlPicture } from '../usecases'

export const useGetPictureUrl = () => {
	const { isPending, mutateAsync: getUrl } = useMutation({
		mutationFn: getUrlPicture,
		onSuccess: (data) => {
			window.open(data.url, '_blank')
		},
	})

	return {
		getUrl,
		isPending,
	}
}
