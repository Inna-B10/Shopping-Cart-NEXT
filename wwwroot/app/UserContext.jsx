'use client'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function useUser() {
	return useContext(UserContext)
}

export function UserProvider({ initialUserLevel, children }) {
	const [userLevel, setUserLevel] = useState(initialUserLevel || '-1')

	// 	useEffect(() => {
	// 		const cookieValue = getUserLevelFromCookie()
	// 		setUserLevel(cookieValue || '-1')
	// 	}, [initialUserLevel])
	//
	// 	const getUserLevelFromCookie = () => {
	// 		const cookieObj = document.cookie.split('; ').reduce((prev, current) => {
	// 			const [name, ...value] = current.split('=')
	// 			prev[name] = decodeURIComponent(value.join('='))
	// 			return prev
	// 		}, {})
	// 		console.log(cookieObj['user_level'])
	// 		return cookieObj['user_level']
	// 	}

	useEffect(() => {
		if (initialUserLevel !== null && initialUserLevel !== undefined) {
			setUserLevel(initialUserLevel)
		} else {
			setUserLevel('-1')
		}
	}, [initialUserLevel])

	// useEffect(() => {
	// 	console.log('User level on mount:', userLevel)
	// 	console.log('initialUserLevel ', initialUserLevel)
	// }, [userLevel, initialUserLevel])

	const setUserLevelCookie = async level => {
		document.cookie = `user_level=${level}; path=/; max-age=${
			60 * 60 * 24 * 7
		}; SameSite=Strict`

		try {
			const response = await axios.post(
				'/api/set-user-level',
				{ userLevel: level },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.status === 200 && response.data.success) {
				setUserLevel(level)
			} else {
				console.error('Failed to set user level cookie on server')
			}
		} catch (error) {
			console.error('Failed to set user level cookie on server', error)
		}
	}

	return (
		<UserContext.Provider
			value={{ userLevel, setUserLevel: setUserLevelCookie }}>
			{children}
		</UserContext.Provider>
	)
}
