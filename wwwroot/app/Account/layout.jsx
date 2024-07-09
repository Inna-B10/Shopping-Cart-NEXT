'use client'
// import { useEffect, useState } from 'react'
import { useUser } from './../UserContext'
// import getCookies from '../lib/getCookies'

export default function UserLayout({ Guest, UserInfo, children }) {
	// console.log(Guest)

	// 	const [userLevel, setUserLevel] = useState(null)
	//
	// 	// Получение значения куки 'user_level'
	// 	useEffect(() => {
	// 		const level = getCookies('user_level')
	// 		setUserLevel(level)
	// 	}, [])

	const { userLevel, setUserLevel } = useUser()
	if (userLevel === undefined || userLevel === null) {
		// Middleware()
		// redirect('/Account')
		return null
	}
	console.log('account layout', userLevel)

	return (
		<>
			{userLevel == -1 ? Guest : UserInfo}
			{/* {children} */}
			<p>Current User Level: {userLevel}</p>
			{/* <button onClick={handleLogin}>Login</button> */}
			<section id='contact'>CONTACT</section>
		</>
	)
}
