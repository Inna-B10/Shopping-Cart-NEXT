'use client'
import { useUser } from '../../UserContext'

export default function UserInfo() {
	const { userId, setUserId, userData } = useUser()

	console.log('userId:', userId)
	console.log('userData', userData)

	const handleLogout = event => {
		event.preventDefault()
		setUserId('-1')
	}

	if (!userData) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h2>UserInfo</h2>
			<p>Current User id: {userId}</p>

			<p>first name: {userData[0].user_Fname}</p>
			<p>last name: {userData[0].user_Lname}</p>

			<button type='submit' onClick={handleLogout}>
				Log ut
			</button>
		</>
	)
}
