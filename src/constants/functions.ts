export const overlayClose = async (elementId: string) => {
	const overlay = await import('preline/preline')
	overlay.HSOverlay.close(document.getElementById(elementId) as HTMLElement)
}

export const overlayOpen = async (elementId: string) => {
	const overlay = await import('preline/preline')
	overlay.HSOverlay.open(document.getElementById(elementId) as HTMLElement)
}
