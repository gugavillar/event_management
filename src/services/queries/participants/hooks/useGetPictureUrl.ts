import { useMutation } from '@/providers/QueryProvider'

import { getUrlPicture } from '../usecases'

export const useGetPictureUrl = () => {
	const { isPending, mutateAsync: getUrl } = useMutation({
		mutationFn: getUrlPicture,
	})

	return {
		getUrl,
		isPending,
	}
}
