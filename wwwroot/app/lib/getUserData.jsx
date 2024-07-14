import axios, { AxiosError } from 'axios'

export default async function getUserData(userId) {
	try {
		const response = await axios.post(
			'http://localhost:5176/Users/GetUserData?userId=' + userId
		)

		if (response.status === 200) {
			console.log('UserData:', response.data.listUsers)
			return response.data.listUsers
		} else {
			console.error(error, AxiosError)
			return null
		}
	} catch (error) {
		console.error(error, AxiosError)
		return null
	}
}
