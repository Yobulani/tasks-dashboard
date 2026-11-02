export const formatDate = (
	rawDate: string | Date,
	format: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}
): string => {
	const date = new Date(rawDate)
	console.log(rawDate)
	if (isNaN(date.getTime())) {
		return '—'
	}

	return new Intl.DateTimeFormat('ru-RU', format).format(date)
}
