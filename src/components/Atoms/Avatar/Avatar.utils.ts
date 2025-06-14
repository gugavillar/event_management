export const generateLettersAvatar = (name: string) => {
	const namesArray = name.split(' ')
	if (namesArray.length > 1) {
		return `${namesArray[0][0].toUpperCase()}${namesArray[namesArray.length - 1][0].toUpperCase()}`
	}
	if (namesArray[0].length > 1) {
		return `${namesArray[0][0].toUpperCase()}${namesArray[0][1].toUpperCase()}`
	}
	return `${namesArray[0][0].toUpperCase()}`
}
