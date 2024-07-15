export const fetchData = async (url, refresh) => {
	try {
		const res = await fetch(url, refresh)
		if (!res.ok) {
			throw new Error(`Failed to fetch data from ${url}, status: ${res.status}`)
		}
		const data = await res.json()
		return data
	} catch (error) {
		throw error // Повторное выбрасывание ошибки
	}
}
