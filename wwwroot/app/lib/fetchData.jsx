export const fetchData = async url => {
	console.log('Function fetchData called')

	try {
		console.log('Before fetch') // Перед запросом
		const res = await fetch(url)
		console.log('Fetch completed', res) // После запроса
		if (!res.ok) {
			throw new Error(`Failed to fetch data from ${url}, status: ${res.status}`)
		}
		const data = await res.json()
		console.log('Data received', data) // Получение данных
		return data.listProducts
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error // Повторное выбрасывание ошибки
	}
}
