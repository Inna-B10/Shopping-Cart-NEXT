'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function useUser() {
	return useContext(UserContext)
}

export function UserProvider({ initialUserLevel, children }) {
	const [userLevel, setUserLevel] = useState(initialUserLevel || -1)

	console.log(initialUserLevel)
	// useEffect(() => {
	// 	const cookieValue = getUserLevelFromCookie()
	// 	console.log(initialUserLevel)
	// 	setUserLevel(cookieValue || '-1')
	// }, [initialUserLevel])

	// const getUserLevelFromCookie = () => {
	// 	const cookieObj = document.cookie.split('; ').reduce((prev, current) => {
	// 		const [name, ...value] = current.split('=')
	// 		prev[name] = decodeURIComponent(value.join('='))
	// 		return prev
	// 	}, {})
	// 	console.log(cookieObj['user_level'])
	// 	return cookieObj['user_level']
	// }

	useEffect(() => {
		console.log('User level on mount:', userLevel)
	}, [userLevel])

	const setUserLevelCookie = async level => {
		document.cookie = `user_level=${level}; path=/; max-age=${
			60 * 60 * 24 * 7
		}; SameSite=Strict`

		const response = await fetch('/api/set-user-level', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userLevel: level }),
		})

		if (response.ok) {
			setUserLevel(level)
		} else {
			console.error('Failed to set user level cookie on server')
		}
	}

	return (
		<UserContext.Provider
			value={{ userLevel, setUserLevel: setUserLevelCookie }}>
			{children}
		</UserContext.Provider>
	)
}
