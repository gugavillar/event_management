export const formatPhone = (phone: string) => {
	if (!phone) return ''
	if (phone.length <= 10) return ''
	return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
}
