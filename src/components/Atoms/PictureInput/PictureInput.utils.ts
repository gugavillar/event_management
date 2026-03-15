import imageCompression from 'browser-image-compression'

export const compressImage = async (file: File) => {
	const options = {
		maxSizeMB: 0.2, // máximo 200KB
		maxWidthOrHeight: 1280,
		useWebWorker: true,
	}

	const compressedFile = await imageCompression(file, options)

	return compressedFile
}
