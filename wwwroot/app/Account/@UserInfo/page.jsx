'use client'
import { useUser } from '../../UserContext'

export default function UserInfo() {
	const { userId, setUserId, userData } = useUser()

	const handleLogout = event => {
		event.preventDefault()
		setUserId('-1')
	}

	if (!userData) {
		return (
			<>
				<h1>Account</h1>
				<p>No connection to database. Please, try again later.</p>
			</>
		)
	}

	return (
		<>
			<h2>UserInfo</h2>
			<p>Current User id: {userId}</p>

			<p>first name: {userData.user_Fname}</p>
			<p>last name: {userData.user_Lname}</p>

			<button type='submit' onClick={handleLogout}>
				Log ut
			</button>
		</>
	)
}
