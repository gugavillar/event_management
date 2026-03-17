import imageCompression from 'browser-image-compression'

export const compressImage = async (file: File) => {
	const options = {
		fileType: 'image/jpeg',
		initialQuality: 0.8,
		maxSizeMB: 0.2, // máximo 200KB
		maxWidthOrHeight: 1280,
		useWebWorker: true,
	}

	const compressedFile = await imageCompression(file, options)

	return compressedFile
}
