import axios, { AxiosError } from 'axios'
import PropTypes from 'prop-types'

getUserData.propTypes = {
	userId: PropTypes.number.isRequired,
}

export default async function getUserData(userId) {
	try {
		const response = await axios.post(
			'http://localhost:5176/Users/GetUserData?userId=' + userId
		)

		if (response.status === 200) {
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
