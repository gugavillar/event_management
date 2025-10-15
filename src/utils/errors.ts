import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const generateToastError = (error: Error, message: string) => {
	if (error instanceof AxiosError) {
		return toast.error(error.response?.data.error)
	}
	return toast.error(message)
}
