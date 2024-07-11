'use client'
import { useUser } from '../../UserContext'

export default function UserInfo() {
	const { userLevel, setUserLevel } = useUser()
	const handleLogout = e => {
		event.preventDefault()
		setUserLevel('-1')
	}

	return (
		<>
			<h2>UserInfo</h2>
			<p>Current User Level: {userLevel}</p>
			<button type='submit' onClick={handleLogout}>
				Log ut
			</button>
		</>
	)
}
